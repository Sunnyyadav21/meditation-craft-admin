//@ts-nocheck
import { PageBreadcrumb } from '@/components'
import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import request from '../../request';


export default function Allproduct() {

    const [products, setProducts] = useState([])
    const notify = () => toast("Product Deleted");
    const tableHeading = [
        { th: "Product Name" },
        // { th: "Product Type" },
        { th: "Product Image" },
        { th: "Price" },
        { th: "Regular Price" },
        { th: "Discount" },
        { th: "Color" },
        { th: "Appearance" },
        { th: "Rarity" },
        { th: "Source" },
        { th: "Weight" },
        { th: "Quantity" },
        { th: "Sku" },
        { th: "Stonetype" },
        { th: "Dimensions" },
        { th: "Producttype" },
        { th: "Stock" },
        { th: "ProductDescription" }
    ]

    const feetchProduct = async () => {
        await axios.get(`${request.get_product}`)
            .then(res => {
                setProducts(res.data.allProduct)
            }).catch(
                (error) => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        feetchProduct()
    }, [])

    const deleteHandel = async (id) => {
        try {
            const response = await axios.delete(`${request.get_product}/${id}`)
            if (response.status == 200) {
                feetchProduct()
                notify()
            }
        } catch (error) {
            console.log(error);

        }
    }



    return (

        <div>
            <ToastContainer />
            <PageBreadcrumb title="All Product" subName="Forms" />
            <>
                <Card>
                    <Card.Header>
                        {/* <h4 className="header-title">Bordered color table</h4> */}
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive-sm">
                            <Table responsive className="table-bordered table-centered mb-0">
                                <thead>
                                    <tr>
                                        {
                                            tableHeading.map((each) => {
                                                return <th key={each.th}>{each.th}</th>
                                            })
                                        }


                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products?.map((product, index) => {
                                            console.log(product._id, 'product');

                                            return (
                                                <tr key={index}>
                                                    <td>{product.product}</td>
                                                    <td><img src={`https://api-staging.meditationcrafts.com/${product.images}`}></img></td>

                                                    {/* <td>{product.subCategorie}</td> */}
                                                    <td>{product.price}</td>
                                                    <td>{product.regularPrice}</td>
                                                    <td>{product.discount}</td>
                                                    <td>{product.color}</td>
                                                    <td>{product.appearance}</td>
                                                    <td>{product.rarity}</td>
                                                    <td>{product.source}</td>
                                                    <td>{product.weight}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{product.sku}</td>
                                                    <td>{product.stonetype}</td>
                                                    <td>{product.dimensions}</td>
                                                    <td>{product.producttype}</td>
                                                    <td>{product.stock}</td>
                                                    <td>{product.description}</td>

                                                    <td align="center">
                                                        <Link to="#" className="text-reset fs-16 px-1" onClick={() => { deleteHandel(product._id) }}>
                                                            <i className="ri-delete-bin-2-line" />
                                                        </Link>
                                                    </td>
                                                    {/* {
                                                        product.subCategories.map((cat, idx) => {
                                                            return (
                                                                <>
                                                                    <td>{cat.subCategorie}</td>
                                                                    <td>{cat.regularPrice}</td>
                                                                    <td><img src={cat.images}></img></td>
                                                                    <td>{cat.discount}</td>
                                                                    <td>{cat.color}</td>
                                                                    <td>{cat.appearance}</td>
                                                                    <td>{cat.rarity}</td>
                                                                    <td>{cat.source}</td>
                                                                    <td>{cat.weight}</td>
                                                                    <td>{cat.quantity}</td>
                                                                    <td>{cat.sku}</td>
                                                                    <td>{cat.stonetype}</td>
                                                                    <td>{cat.dimensions}</td>
                                                                    <td>{cat.producttype}</td>
                                                                    <td>{cat.description}</td>
                                                                    <td>{cat.stock}</td>
                                                                    <td>{cat.stock}</td>
                                                                    <td align="center">
                                                                        <Link to="#" className="text-reset fs-16 px-1">

                                                                            <i className="ri-delete-bin-2-line" />
                                                                        </Link>
                                                                    </td>
                                                                </>
                                                            )
                                                        })
                                                    } */}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </>
        </div>
    )
}
