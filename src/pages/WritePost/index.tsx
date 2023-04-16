import React from 'react';
import styled from 'styled-components';

const WritePost = () => {
    return (
        <Writepost>
            <Title></Title>

            <Form>
                <Row>
                    <Label></Label>
                    <Input/>
                </Row> 
                <Row>
                    <Label></Label>
                    <Select/>
                </Row>
                <Row>
                    <Label></Label>
                    <OptionButton></OptionButton>
                    <OptionButton></OptionButton>
                </Row>
                <Row>
                    <Label></Label>
                    <Input/>
                </Row>
            </Form>

            <Img>
            </Img>

            <TextArea />
            
            <Buttons>
                <UploadButton></UploadButton>
                <ReturnButton></ReturnButton>
            </Buttons>
        </Writepost>
    );
};

export default WritePost;

const Writepost = styled.div``;
const Title = styled.h1``;
const Form = styled.form``;
const Row = styled.div``;
const Label = styled.label``;
const Input = styled.input``;
const Select = styled.select``;
const OptionButton = styled.button``;
const Img = styled.img``;
const TextArea = styled.textarea``;
const Buttons = styled.div``;
const UploadButton = styled.button``;
const ReturnButton = styled.button``;