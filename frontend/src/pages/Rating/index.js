import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactBootstrap, { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip, Image } from 'react-bootstrap'
import api from '../../services/api'
import loadingPath from '../../assets/image/loading-button.gif'
import jwt from 'jsonwebtoken';
import ReactGA from 'react-ga';

function Rating(props) {
    var ratingQuestion, ratingOpenQuestion = null;
    const token = window.location.hash != '' ? window.location.hash.replace('#', '') : getParameterByName('token');

    try {
        const payload = jwt.decode(token).data;
        ratingQuestion = payload.ratingQuestion;
        ratingOpenQuestion = payload.ratingOpenQuestion;
    }
    catch
    {
        registerGAEvent("Problema na decodificação do token", getParameterByName("token"));
    }

    var questionText = ratingQuestion == null ? "Numa escala de 1 a 5 como você classifica a sua experiência nessa tela?" : ratingQuestion;
    var openQuestionText = ratingOpenQuestion == null ? "Conta para a gente porque você deu a nota acima" : ratingOpenQuestion;

    const history = useHistory();
    const [comment, setComment] = useState(null);
    const [ratingValue, setRating] = useState('');
    const [isLoading, setLoading] = useState(false);

    function handleSendRating(e) {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {

            try {

                const data = { comment, ratingValue };
                const headers =
                {
                    'authorization': 'Bearer ' + token
                }

                const response = api.post("/rating", data, {
                    headers: headers
                });

                ReactGA.event({
                    category: 'Avaliação',
                    action: 'Clicou no enviar',
                    label: JSON.stringify({ data: data, token: token })
                });

            }
            catch (error) {
            }

            history.push("/obrigado-pela-contribuicao" + window.location.search);

        }, 1);
    }

    function registerGAEvent(action, data) {
        try {
            ReactGA.event({
                category: 'Avaliação',
                action: action,
                label: JSON.stringify({ valor: data, token: token })
            });
        }
        catch
        {
        }
    }

    function handleRating(action, data) {
        try {
            setRating(data);
            registerGAEvent(action, data);
        }
        catch { }

    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.toLowerCase().replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return null;//'';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    document.title = "Feedback sobre a funcionalidade"

    return (
        <Container fluid="sm">
            <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;500&display=swap" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <Row>
                <Col>
                    <label className="ratingquestion">{questionText}</label>
                </Col>
            </Row>
            <Row xs={5} sm={7} md={7} lg={7} >
                {[
                    { id: 1, tip: "Eu encontrei algum valor, mas a maioria das expectativas não foram atendidas" },
                    { id: 2, tip: "Algumas expectativas não foram atendidas" },
                    { id: 3, tip: "A maioria das expectativas foram atendidas, mas ainda tenho algumas considerações" },
                    { id: 4, tip: "Minhas expectativas foram atendidas" },
                    { id: 5, tip: "Minhas expectativas foram superadas" }].map((item) => (
                        <Col xs={1} sm={1} md={1} lg={1} >
                            <div className="stars">
                                <OverlayTrigger
                                    key={item.id}
                                    placement="bottom"
                                    onEnter={e => registerGAEvent('Focus na avaliação', item.tip.toString())}
                                    overlay={
                                        <Tooltip id={`tooltip-${item.tip}`}>
                                            <strong>{item.tip}</strong>
                                        </Tooltip>
                                    }>
                                    <span className={ratingValue >= item.id ? "checked fa fa-star" : "fa fa-star"} onClick={e => handleRating("Cliquei na avaliação", item.id.toString())} ></span>
                                </OverlayTrigger>
                                <div >{item.id}</div>
                            </div>
                        </Col>
                    ))}
            </Row>
            <Form action="" onSubmit={handleSendRating}>
                <Row xs={1} sm={1} md={2} lg={2} >
                    <Col>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows="3"
                                name={comment}
                                onBlur={e => registerGAEvent('Tirei o foco do comentário', e.target.value)}
                                onChange={e => setComment(e.target.value)}
                                placeholder={openQuestionText} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {!isLoading ?
                            <Button variant="primary" type="submit" disabled={ratingValue == '' ? true : false} >
                                Enviar
                            </Button>
                            :
                            <span>
                                <Image src={loadingPath} ></Image>  <label className="ratingquestion">Aguarde enviando...</label>
                            </span>
                        }
                    </Col>
                </Row>
            </Form>

        </Container>
    );
}

export default Rating;