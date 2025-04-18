//@ts-nocheck
import { FormInput, PageBreadcrumb } from '@/components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import request from '../../request';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    const [healingWithCrystals, setHealingWithCrystals] = useState('');
    const [healingWithVastu, setHealingWithVastu] = useState('')
    const [howCanYouUse, setHowCanYouUse] = useState('')
    const [metaphysicalProperties, setMetaphysicalProperties] = useState('')
    const [features, setFeatures] = useState('')

    const [variants, setVariants] = useState([{ weight: "", price: "", stock: "" }])


    // Fetch categories from API (optional)
    useEffect(() => {
        axios.get(`${request.get_categorie}`) // Change URL to your API endpoint
            .then((response) => {
                setCategories(response?.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleVariantChange = (index, field, value) => {
        const updated = [...variants];
        updated[index][field] = value;
        setVariants(updated);
      };

    const addVariant = ()=>{
       setVariants([...variants, { weight: "", price: "", stock: ""}])
    } 

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages(prev => [...prev, ...selectedFiles]);
    };

    const removeImage = (indexToRemove) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };
    
    
    // const priceArray = productPrice
    //     .split(',')
    //     .map(p => parseFloat(p.trim()))
    //     .filter(p => !isNaN(p));  


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(variants)
        
        try {
            // Create FormData to send images
            const formData = new FormData();
            formData.append("product", productName);
            // priceArray.forEach((p) => {
            //     formData.append("price", p);
            // });
            variants.forEach((variant, index) => {
                formData.append(`variants[${index}][weight]`, variant.weight);
                formData.append(`variants[${index}][price]`, variant.price);
                formData.append(`variants[${index}][stock]`, variant.stock);
            });
            formData.append("discount", discount);
            formData.append("color", color);
            formData.append("appearance", appearance);
            formData.append("rarity", rarity);
            formData.append("source", source);
            // formData.append("weight", weight);
            // formData.append("quantity", quantity);
            formData.append("sku", sku);
            formData.append("stonetype", stonetype);
            formData.append("dimensions", dimensions);
            formData.append("producttype", producttype);
            // formData.append("stock", stock);
            formData.append("description", productDescription);
            formData.append("category", category);
            formData.append("healingWithCrystals", healingWithCrystals);
            formData.append("healingWithVastu", healingWithVastu);
            formData.append("metaphysicalProperties", metaphysicalProperties);
            formData.append("features", features);

            // Convert images to FormData
            if (images.length > 0) {
                Array.from(images).forEach((image) => {
                    formData.append("images", image);
                });
            }

            // Send as multipart/form-data
            await axios.post(`${request.create_product}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Product added successfully!");
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit product");
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
                                // { label: "Price", state: setProductPrice },
                                // { label: "Weight", state: setWeight },
                                // { label: "Regular Price", state: setRegularPrice },
                                { label: "Discount", state: setDiscount },
                                { label: "Color", state: setColor },
                                { label: "Appearance", state: setAppearance },
                                { label: "Rarity", state: setRarity },
                                { label: "Source", state: setSource },
                                // { label: "Quantity", state: setQuantity },
                                { label: "SKU", state: setSku },
                                { label: "Stone Type", state: setStonetype },
                                { label: "Dimensions", state: setDimensions },
                                { label: "Product Type", state: setProducttype },
                                // { label: "Stock", state: setStock },
                                // { label: "Product Description", state: setProductDescription },
                                // { label: "Healing with crystals", state: setHealingWithCrystals }
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
        label="Upload Images"
        type="file"
        multiple
        containerClass="mb-3"
        onChange={handleImageChange}
    />
    {images.length > 0 && (
        <div>
            {Array.from(images).map((file, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{file.name}</span>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => removeImage(index)}
                    >
                        Remove
                    </Button>
                </div>
            ))}
        </div>
    )}
</Col>

                            <Col lg={6}>
                                {
                                    variants.map((variant, index) => {
                                        return (
                                            <div key={index}>
                                                <Row>
                                                <Col lg={4}>
                                                <FormInput type='text'
                                                  label='Weight'
                                                    placeholder="weight"
                                                    value={variant.weight}
                                                    onChange={(e) =>
                                                        handleVariantChange(index, "weight", e.target.value)
                                                    }
                                                />
                                               
                                                </Col>
                                                
                                                <Col lg={4}>
                                                <FormInput type='text'
                                                label='Price'
                                                    placeholder="price"
                                                    value={variant.price}
                                                    onChange={(e) =>
                                                        handleVariantChange(index, "price", e.target.value)
                                                    }
                                                />
                                                
                                                </Col>
                                                
                                                <Col lg={4}>
                                                <FormInput type='text'
                                                 label='Stock'
                                                    placeholder="stock"
                                                    value={variant.stock}
                                                    onChange={(e) =>
                                                        handleVariantChange(index, "stock", e.target.value)
                                                    }
                                                />
                                                </Col>
                                                </Row>
                                               
                                            </div>
                                        )
                                    })
                                    
                                }
                                 <Button className='mt-3 mb-3' onClick={addVariant}>Add Variant </Button>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label >
                                    Product Description</Form.Label>
                                    <ReactQuill
                                        theme="snow"
                                        value={productDescription}
                                        onChange={setProductDescription}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label >Healing with crystals</Form.Label>
                                    <ReactQuill
                                        theme="snow"
                                        value={healingWithCrystals}
                                        onChange={setHealingWithCrystals}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label >Healing with vastu</Form.Label>
                                    <ReactQuill
                                        theme="snow"
                                        value={healingWithVastu}
                                        onChange={setHealingWithVastu}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label >How can you use it </Form.Label>
                                    <ReactQuill
                                        theme="snow"
                                        value={howCanYouUse}
                                        onChange={setHowCanYouUse}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label >Metaphysical Properties </Form.Label>
                                    <ReactQuill
                                        theme="snow"
                                        value={metaphysicalProperties}
                                        onChange={setMetaphysicalProperties}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label >Features </Form.Label>
                                    <ReactQuill
                                        theme="snow"
                                        value={features}
                                        onChange={setFeatures}
                                    />
                                </Form.Group>
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
