import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({dish}) {
    if (dish != null) {
        return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{ dish.name }</CardTitle>
                <CardText>{ dish.description }</CardText>
            </CardBody>
        </Card>
        );
    } else {
        return <div></div>;
    }
}

function RenderComments({comments}) {
    if (comments != null) {
        const cmts = comments.map((comment) => {
            return (
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date( Date.parse(comment.date)))}</p>
                </div>
            )
        });
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {cmts}
                </ul>
            </div>
        );
    } else {
        return <div></div>;
    }
}

// const required = (val) => val && val.length;
const maxLength = (len) => val => !(val) || (val.length <= len);
const minLength = (len) => val => (val) && (val.length >= len);

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        console.log("toggle model is invoked")
        this.setState( {
            isModalOpen: !this.state.isModalOpen,
        });
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={this.props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={this.props.comments} />
                        <Button outline onClick={this.toggleModal}>
                            <span className=""></span> Submit Comment
                        </Button>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Label htmlFor="rating">Rating</Label> 
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.select model=".select" id="rating" name="rating"
                                        className="form-control"
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                </Col>
                            </Row>
                            <Label htmlFor=".name">Your Name</Label>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        className="form-control"
                                        placeholder="Your Name"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors 
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Label htmlFor=".comment">Comment</Label>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="10"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>    
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

    


export default DishDetail;