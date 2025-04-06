//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { FormInput, PageBreadcrumb } from '@/components';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import request from '../../request';
 
export default function Category() {

    const [category, setCategory] = useState()
    const notify = () => toast("Categories created successfully!");
     
    alert(apiUrl)
    const handelSubmit = async (e) => {
        e.preventDefault()
        const data = {
            categoriesName: category
        }
        try {
            const response = await axios.post(`${request.create_categorie}`, data)
            if (response.status == 201) {
                notify()
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <ToastContainer />
            <PageBreadcrumb title="Add Category" subName="Forms" />
            <Card>
                <Card.Header>

                </Card.Header>
                <Card.Body>
                    <form onSubmit={handelSubmit}>
                        <Row>

                            <Col lg={3}>
                                <FormInput
                                    label="Category"
                                    type="text"
                                    containerClass="mb-3"
                                    onChange={(e) => { setCategory(e.target.value) }}
                                />
                            </Col>
                        </Row>
                        <Button className="btn-outline-secondary" type="submit">
                            Add
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </div>
    )
}
