"use server"

import { redirect } from "next/navigation"

export const filterProduct = (formData: FormData) => {
    const prodFilter = formData.getAll('Categories[]')
    const priceFilter = formData.getAll('Price[]')

    const params = new URLSearchParams();

    if (prodFilter) {
        params.append('prod_category', prodFilter.join(','));
    }

    if (priceFilter) {
        params.append('prod_price', priceFilter.join(','));
    }

    if (params.toString()) {
        redirect(`/?${params.toString()}`);
    } else {
        console.log('No filters applied');
    }
}
