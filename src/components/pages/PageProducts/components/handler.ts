import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import productList from "./productList.json";
import { Product } from "models/Product";

export const getProductsList = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const productList = await fetchProductList();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(productList),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export const getProductsById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
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

    const product = await findProductById(productId);

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
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

const fetchProductList = async (): Promise<Product[]> => {
  return productList;
};

const findProductById = async (productId: string): Promise<Product | undefined> => {
  return productList.find(product => product.id === productId);
};
