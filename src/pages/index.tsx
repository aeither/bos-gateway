import { useBosComponents } from "@/hooks/useBosComponents";
import { useDefaultLayout } from "@/hooks/useLayout";
import type { NextPageWithLayout } from "@/utils/types";
import { ComponentWrapperPage } from "@/components/ComponentWrapperPage";

const HomePage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <>
      <ComponentWrapperPage src={components.home} />
      <ComponentWrapperPage
        src={
          "f54a9bc1772d359e09686dc19b32d291234bdbaa685cdd87ff1ef68d3c0dc74a/widget/tset1"
        }
      />
      <ComponentWrapperPage
        src={
          "f54a9bc1772d359e09686dc19b32d291234bdbaa685cdd87ff1ef68d3c0dc74a/widget/kitchensink"
        }
        componentProps={{ name: "jack" }}
      />
    </>
  );
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
