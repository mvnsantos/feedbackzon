import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactBootstrap, { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

function RatingSuccess(props) {
    document.title = "Obrigado pelo feedback sobre a funcionalidade"

    return (
        <Container fluid="sm" className="justify-content-md-center">
            <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;500&display=swap" rel="stylesheet"></link>

            <Row>
                <Col>
                    <h5 className="title" >Obrigado</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span >Seu feedback nos ajudará a construir um produto cada vez melhor =)</span>
                </Col>
            </Row>
        </Container>


    );
}

export default RatingSuccess;