import React, { useState } from 'react';
import styled from 'styled-components';
import AddPageModal from './AddPageModal';
import CloseButton from '../../components/closeButton';

const StyledModalOverlay = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    background-color: rgba(0, 0, 0, 0.5);
}
`

const StyledModalContent = styled.div`
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.5rem;
    padding: 1.25rem;
    min-width: 300px;
    width: 35%;
    height: 80vh;
    max-width: 500px;
    z-index: 51;
    overflow-y: auto;
    background-color: white;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -4px rgba(0, 0, 0, 0.1);
`

const StyledAddButton = styled.button`
    background: #222;
    color: #fff;
    transition: transform 0.2s ease;
    z-index: 50;
    width: 50px;
    height: 50px;

    &:hover {
        transform: scale(1.1);
    }

    position: fixed;
    bottom: 2rem;
    right: 2rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.875rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledTabButton = styled.button`
    color: var(--body-text-color);
    
    &.active {
        color: var(--primary-color);
        
        &:after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--primary-color);
        }
    }
`;

const BuildMode = ({ theme }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('addPage');

    const handleClose = () => {
        setIsModalOpen(false)
    }

    return (
        !isModalOpen ?
            <StyledAddButton 
                onClick={() => setIsModalOpen(true)}
            >
                +
            </StyledAddButton>
            :
            <StyledModalOverlay onClick={handleClose}>
                <StyledModalContent 
                    onClick={e => e.stopPropagation()}
                >
                    <CloseButton closeFn={handleClose} position={{x: '95', y: '0'}} />

                    <div className="flex justify-start mb-4 border-b border-gray-200">
                        <StyledTabButton
                            onClick={() => setActiveTab('addPage')}
                            className={`relative mr-4 py-2 px-4 bg-transparent border-none cursor-pointer ${activeTab === 'addPage' ? 'active' : ''}`}
                            $theme={theme}
                        >
                            Add Page
                        </StyledTabButton>
                        <StyledTabButton
                            onClick={() => setActiveTab('editSpace')}
                            className={`relative mr-4 py-2 px-4 bg-transparent border-none cursor-pointer ${activeTab === 'editSpace' ? 'active' : ''}`}
                            $theme={theme}
                        >
                            Edit Space
                        </StyledTabButton>
                    </div>

                    <AddPageModal setIsModalOpen={setIsModalOpen} />
                </StyledModalContent>
            </StyledModalOverlay>
    );
};

export default BuildMode; 