import React from "react";

import {Card, CardBody, CardFooter, Col, Row,} from "reactstrap";

const User = () => {
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="7">
                        <Card className="card-user">
                            <div className="image">
                                <img
                                    alt="..."
                                    src={"assets/img/damir-bosnjak.jpg"}
                                />
                            </div>
                            <CardBody>
                                <div className="author">
                                    <a onClick={(e) => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="avatar border-gray"
                                            src={"assets/img/mike.jpg"}
                                        />

                                        <h5 className="title">Chet Faker</h5>
                                    </a>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <hr/>
                                <div className="button-container">
                                    <Row>
                                        <Col className="ml-auto" lg="3" md="6" xs="6">
                                            <h5>
                                                12 <br/>
                                                <small>Files</small>
                                            </h5>
                                        </Col>
                                        <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                                            <h5>
                                                2GB <br/>
                                                <small>Used</small>
                                            </h5>
                                        </Col>
                                        <Col className="mr-auto" lg="3">
                                            <h5>
                                                24,6$ <br/>
                                                <small>Spent</small>
                                            </h5>
                                        </Col>
                                    </Row>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default User;
