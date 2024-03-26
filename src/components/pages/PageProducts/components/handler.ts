import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import productList from "./productList.json";
import { Product } from "models/Product";

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     description: Retrieve a list of products from the Product Service
 *     responses:
 *       '200':
 *         description: A JSON array of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
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

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a product by its unique identifier from the Product Service
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON object representing the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Product not found
 */
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
