import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerSpecs from "../../../swaggerConfig";

const SwaggerDocumentation: React.FC = () => {
  return (
    <div>
      <SwaggerUI spec={swaggerSpecs} />
    </div>
  );
};

export default SwaggerDocumentation;
