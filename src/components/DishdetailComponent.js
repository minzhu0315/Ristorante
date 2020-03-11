import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

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

function RenderComments({dish}) {
    if (dish != null) {
        const comments = dish.comments.map((comment) => {
            return (
                <div>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date( Date.parse(comment.date)))}</p>
                </div>
            )
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments}
                </ul>
            </div>
        );
    } else {
        return <div></div>;
    }
}

const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {/* {this.renderDish(this.props.selectedDish)} */}
                    <RenderDish dish={props.selectedDish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    {/* {this.renderComments(this.props.selectedDish)} */}
                    <RenderComments dish={props.selectedDish} />
                </div>
            </div>
        </div>
    );
}

    


export default DishDetail;