//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { FormInput, PageBreadcrumb } from '@/components';
import { Button, Card, Col, Form, Row, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import request from '../../request';
 
 

 

export default function Allcategory() {
     
    const baseURL = import.meta.env.VITE_BASE_URL;
    
    const [category, setCategory] = useState()
    const [updateCategory, setUpdateCategory] = useState()
    const [show, setShow] = useState(false)
     
    
    // const notify = () => toast("Delated successfully");
    const notify = (message) => toast(message);

    const fetchCategory = () => {
        axios.get(`${request.get_categorie}`).then(res => {
            setCategory(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const categoryDeleteHandel = async (id) => {
        try {
            const response = await axios.delete(`${request.get_categorie}/${id}`)
            if (response.status == 200) {
                notify("Delated successfully");
                fetchCategory()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const openModal = (cat) => {
        setUpdateCategory(cat)
        setShow(true)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleCategoryUpdate = (e) => {
        setUpdateCategory({ ...updateCategory, "categoriesName": e })
    }

    const updateCategoryApi = async () => {
        try {
            const response = await axios.put(`${request.get_categorie}/${updateCategory._id}`, {
                categoriesName: updateCategory.categoriesName
            })
            if (response.status == 200) {
                notify(`Category updated successfully!`);
                fetchCategory();
                setShow(false)
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
                    {/* <h4 className="header-title">Bordered color table</h4> */}
                </Card.Header>
                <Card.Body>
                    <div className="table-responsive-sm">
                        <Table responsive className="table-bordered table-centered mb-0">
                            <thead>
                                <tr>
                                    <th className="text-left">Category</th>
                                    <th className="text-left">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    category?.data.map((each, index) => {
                                        return <tr key={index}>
                                            <td>{each.categoriesName}</td>
                                            <td>
                                                <Link onClick={() => { categoryDeleteHandel(each._id) }} to="#" className="text-reset fs-16 px-1">
                                                    <i className="ri-delete-bin-2-line" />
                                                </Link>
                                                <Link to="#" onClick={() => { openModal(each) }} className="text-reset fs-16 px-1">
                                                    <i className=" ri-pencil-line" />
                                                </Link>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
            {/* Edit Category Modal */}
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateCategory?.categoriesName || ""}
                                onChange={(e) => handleCategoryUpdate(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { closeModal() }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { updateCategoryApi() }}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
