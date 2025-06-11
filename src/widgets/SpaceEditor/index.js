import React, { useState } from 'react';
import styled from 'styled-components';
import AddPageModal from './AddPageModal';
import CloseButton from '../../components/closeButton';

const StyledModalOverlay = styled.div`
    background: rgba(0, 0, 0, 0.5);
`

const StyledModalContent = styled.div`
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`

const StyledAddButton = styled.button`
    background: #222;
    color: #fff;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
    }
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
                className="fixed bottom-8 right-8 w-[50px] h-[50px] rounded-full border-none cursor-pointer flex items-center justify-center text-3xl shadow-md z-10"
                >
                    +
            </StyledAddButton>
                
            :

            <StyledModalOverlay
                className="fixed inset-0 z-50"
            >
                <StyledModalContent 
                    onClick={e => e.stopPropagation()}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-5 min-w-[300px] w-[35%] max-w-[500px] z-[51]"
                >
                    <CloseButton closeFn={handleClose} position={{x: '90', y: '10'}} />

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