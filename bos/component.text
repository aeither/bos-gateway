let greeting = `Have a great day ${props.name}.`;
const decimals = 18;

function formatHex0(value, tokenDecimals) {
  const formattedValue = Big(value.toString())
    .div(Big(10).pow(tokenDecimals))
    .toFixed(0)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  return formattedValue;
}

function formatHex(value, tokenDecimals) {
  const formattedValue = Big(value.toString())
    .div(Big(10).pow(tokenDecimals))
    .toFixed(6)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  return formattedValue;
}

State.init({
  strEther: 0,
  gasPrice: 0,
});

// Force user to connect to Base to show UI
if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

if (state.chainId !== undefined && state.chainId !== 8453) {
  return <p>Switch to Base Mainnet</p>;
}

// FETCH ABI

const contractAddress = "0xCF205808Ed36593aa40a44F10c7f7C2F67d4A4d4";
const tokenDecimals = 18;

const contractAbi = fetch(
  "https://raw.githubusercontent.com/aeither/bos-gateway/main/abi/FriendtechSharesV1.json"
);
if (!contractAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(contractAbi.body);

// HELPER FUNCTIONS

function getGasPrice() {
  return Ethers.provider().getGasPrice();
}

// DETECT SENDER

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

// FETCH SENDER BALANCE

if (state.balance === undefined && state.sender) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

// OUTPUT UI

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

return (
  <>
    <div class="sticky-top bg-white text-dark border-bottom">
      <div class="container px-0 py-2">
        <div class="row justify-content-between">
          <div class="col">
            <h2>
              <span class="text-info">friend.</span>tech
            </h2>
          </div>
          <div class="col">
            <div class="row justify-content-between">
              <Web3Connect connectLabel="Connect" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {!!state.sender && (
      <div class="container centered-text">
        <div class="row">
          <div class="col">
            <div class="border rounded py-2 my-2 text-center">
              ⬨ {state.balance} ETH - {getSender()}
            </div>
          </div>
        </div>
      </div>
    )}

    <div class="container centered-text">
      <h4>Highlights</h4>
      <div class="row">
        <div class="col m-2">Herro - 0x5479...0311</div>
        <div class="col">
          <button
            onClick={() => {
              clipboard.writeText("0x5479f127a4d594208549c86f4b4903a1175a0311");
            }}
          >
            Copy
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col m-2">Cobie - 0x4e5f...676e1</div>
        <div class="col">
          <button
            onClick={() => {
              clipboard.writeText("0x4e5f7e4a774bd30b9bdca7eb84ce3681a71676e1");
            }}
          >
            Copy
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col m-2">Machi BB - 0xf0ea...df3d</div>
        <div class="col">
          <button
            onClick={() => {
              clipboard.writeText("0xf0ea13334d6f74044ec7332de1c6ec194179df3d");
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </div>

    <div class="container centered-text mt-4">
      <h4>Explore</h4>
      <div class="row">
        <div class="col py-2">
          <input
            disabled={!state.sender}
            value={state.targetAddress}
            onChange={(e) => State.update({ targetAddress: e.target.value })}
            placeholder="Address"
          />
          <button
            onClick={() => {
              const friendTechContract = new ethers.Contract(
                contractAddress,
                contractAbi.body,
                Ethers.provider().getSigner()
              );

              // Total supply
              friendTechContract
                .sharesSupply(state.targetAddress)
                .then((data) => {
                  console.log(formatHex(data, 0));
                  State.update({ sharesSupply: formatHex0(data, 0) });
                });

              // Get Sell Price
              friendTechContract
                .getSellPrice(state.targetAddress, 1)
                .then((data) => {
                  console.log(formatHex(data, decimals));
                  State.update({ sellPrice: formatHex(data, decimals) });
                });

              // Get Sell Price After Fee
              friendTechContract
                .getSellPriceAfterFee(state.targetAddress, 1)
                .then((data) => {
                  console.log(formatHex(data, decimals));
                  State.update({
                    sellPriceAfterFee: formatHex(data, decimals),
                  });
                });

              // Get Buy Price
              friendTechContract
                .getBuyPrice(state.targetAddress, 1)
                .then((data) => {
                  console.log(formatHex(data, decimals));
                  State.update({ buyPrice: formatHex(data, decimals) });
                });

              // Get Buy Price After Fee
              friendTechContract
                .getBuyPriceAfterFee(state.targetAddress, 1)
                .then((data) => {
                  console.log(formatHex(data, decimals));
                  State.update({ buyPriceAfterFee: formatHex(data, decimals) });
                });

              // Get target user balance
              Ethers.provider()
                .getBalance(state.targetAddress)
                .then((balance) => {
                  console.log("balance", formatHex(balance, decimals));
                  State.update({ targetBalance: formatHex(balance, decimals) });
                });
            }}
          >
            🔍 Search
          </button>
        </div>
      </div>
    </div>

    {state.targetAddress && state.sharesSupply && (
      <>
        <div class="container centered-text">
          <div class="row ">
            <div class="col ">
              <div class="border rounded py-2 my-2">
                <div class="px-2">Supply: {state.sharesSupply}</div>
                <div class="px-2">Buy Price: {state.buyPrice}</div>
                <div class="px-2">
                  Buy Price (including fees): {state.buyPriceAfterFee}{" "}
                </div>
                <div class="px-2">Sell Price: {state.sellPrice}</div>
                <div class="px-2">
                  Sell Price (including fees): {state.sellPriceAfterFee}
                </div>
                <div class="px-2">Address Balance: {state.targetBalance}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="container centered-text">
          <div class="row">
            <div class="col">
              <div class="d-grid gap-2 d-md-block">
                <button
                  onClick={() => {
                    const friendTechContract = new ethers.Contract(
                      contractAddress,
                      contractAbi.body,
                      Ethers.provider().getSigner()
                    );

                    // Buy Shares
                    friendTechContract
                      .buyShares(state.targetAddress, 1, {
                        value: ethers.utils.parseEther(state.buyPriceAfterFee),
                      })
                      .then((data) => {
                        console.log(data);
                      });
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
            <div class="col">
              <div class="d-grid gap-2 d-md-block">
                <button
                  class="btn btn-danger"
                  onClick={() => {
                    const friendTechContract = new ethers.Contract(
                      contractAddress,
                      contractAbi.body,
                      Ethers.provider().getSigner()
                    );

                    // Sell Shares
                    friendTechContract
                      .sellShares(state.targetAddress, 1, {
                        value: ethers.utils.parseEther(state.sellPriceAfterFee),
                      })
                      .then((data) => {
                        console.log(data);
                      });
                  }}
                >
                  Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
  </>
);
