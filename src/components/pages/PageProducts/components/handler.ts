import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import productList from "./productList.json";

export const getProductsList = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Adjust CORS policy as needed
    },
    body: JSON.stringify(productList),
  };
};

export const getProductsById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productId = event.pathParameters?.productId;

  if (!productId) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Product ID is missing' }),
    };
  }

  // Search for product by productId
  const product = productList.find((p) => p.id === productId);

  if (product) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(product),
    };
  } else {
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Product not found' }),
    };
  }
};
