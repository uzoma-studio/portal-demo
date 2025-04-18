import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Cart, { addToCart } from './cart'

const StyledProductModal = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
        background: white;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 20px;
        min-width: 300px;
        width: 50%;
        z-index: 1000;
    }
`

const SingleProduct = ({ product, currency, setShowCart, setCurrentProduct }) => {
    const { name, price, productImage, description } = product;
    const { url, width, height, alt } = productImage;

    const handleButtonClick = () => {
        addToCart({name, price, image: {url, alt}})
        setShowCart(true)
        setCurrentProduct(null)
    }

    return (
        <StyledProductModal>
            <div className='modal'>
                <div className='img-container'>
                    <Image src={url} width={width} height={height} alt={alt} />
                </div>
                <div className='text-container'>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <div>
                        <p>Price</p>
                        <p>{`${currency} ${price}`}</p>
                    </div>
                </div>
                <div>
                    <button className='default-button' onClick={() => handleButtonClick()}>Add to cart</button>
                </div>
            </div>
        </StyledProductModal>
    )
}

export default SingleProduct