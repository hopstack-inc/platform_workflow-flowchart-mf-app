import { useContext, useEffect } from "react";

import { StatContext } from "#contexts/stat";

const withStatsLogic = (WrappedComponent) => {
  return (props) => {
    const stat = useContext(StatContext);
    useEffect(() => {
      stat.setGraphs();
    }, []);
    return (
      <WrappedComponent stats={[]} graphs={stat.graphs} items={stat.items} />
    );
  };
};

export default withStatsLogic;
