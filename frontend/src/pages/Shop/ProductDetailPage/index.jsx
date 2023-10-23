import React from 'react'
import ProductDetail from '../../../features/ProductScreen/ProductDetail';
import { useLoaderData } from 'react-router-dom';
import { getDocumentById } from '../../../services/api';

export default function ProductDetailPage() {
	const productById = useLoaderData();
	return <ProductDetail product={productById} />;
}


export const loader = async({ params }) => {
    const {product} = await getDocumentById(params.productId, 'products');
    if (!product) {
		throw new Response('', {
			status: 404,
			statusText: 'Not Found',
		});
	}
	return product;
}

