import { deploymentConfig } from "../config/features";
import UnderConstruction from "./UnderConstruction";

export default function FeatureGate({ feature, pageName, children }) {
  const isEnabled = deploymentConfig[feature];

  if (isEnabled) {
    return children;
  }

  return <UnderConstruction pageName={pageName} />;
}

