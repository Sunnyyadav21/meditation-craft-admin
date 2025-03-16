//@ts-nocheck
import { FormInput, PageBreadcrumb } from '@/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

const Product = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [regularPrice, setRegularPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [color, setColor] = useState('');
    const [appearance, setAppearance] = useState('');
    const [rarity, setRarity] = useState('');
    const [source, setSource] = useState('');
    const [weight, setWeight] = useState('');
    const [quantity, setQuantity] = useState('');
    const [sku, setSku] = useState('');
    const [stonetype, setStonetype] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [producttype, setProducttype] = useState('');
    const [stock, setStock] = useState('');
    const [images, setImages] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [category, setCategory] = useState(''); // GEt the category id for map the product 
    const [categories, setCategories] = useState([]); // State for dynamic categories



    // Fetch categories from API (optional)
    useEffect(() => {
        axios.get('http://localhost:5000/categorie') // Change URL to your API endpoint
            .then((response) => {
                setCategories(response?.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                product: productName,
                price: productPrice,
                regularPrice,
                discount,
                color,
                appearance,
                rarity,
                source,
                weight,
                quantity,
                sku,
                stonetype,
                dimensions: dimensions ? [dimensions] : [],
                producttype: producttype ? [producttype] : [],
                stock,
                images: images ? [images] : [],
                description: productDescription,
                category, // Updated category ID
            };

            await axios.post('http://localhost:5000/product', data);
            alert("Data submitted successfully!");
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit data");
        }
    };

    return (
        <>
            <PageBreadcrumb title="Add Product" subName="Forms" />
            <Card>
                <Card.Header>

                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            {/* Category Dropdown */}
                            <Col lg={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="">Select Category</option>
                                        {categories?.data?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.categoriesName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            {/* Other Input Fields */}
                            {[
                                { label: "Product Name", state: setProductName },
                                { label: "Price", state: setProductPrice },
                                { label: "Regular Price", state: setRegularPrice },
                                { label: "Discount", state: setDiscount },
                                { label: "Color", state: setColor },
                                { label: "Appearance", state: setAppearance },
                                { label: "Rarity", state: setRarity },
                                { label: "Source", state: setSource },
                                { label: "Weight", state: setWeight },
                                { label: "Quantity", state: setQuantity },
                                { label: "SKU", state: setSku },
                                { label: "Stone Type", state: setStonetype },
                                { label: "Dimensions", state: setDimensions },
                                { label: "Product Type", state: setProducttype },
                                { label: "Stock", state: setStock },
                                { label: "Product Description", state: setProductDescription }
                            ].map((input, index) => (
                                <Col lg={3} key={index}>
                                    <FormInput
                                        label={input.label}
                                        type="text"
                                        containerClass="mb-3"
                                        onChange={(e) => input.state(e.target.value)}
                                    />
                                </Col>
                            ))}

                            {/* Image Upload */}
                            <Col lg={3}>
                                <FormInput
                                    label="Image URL"
                                    type="file"
                                    containerClass="mb-3"
                                    onChange={(e) => setImages(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Button className="btn-outline-secondary" type="submit">
                            Add
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </>
    );
};

export default Product;
