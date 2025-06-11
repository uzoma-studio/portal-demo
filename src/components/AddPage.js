import React, { useState } from 'react';
import styled from 'styled-components';

const StyledAddButton = styled.button`
    background: ${props => props.$theme?.style?.primaryColor || '#222'};
    color: ${props => props.$theme?.style?.accentColor || '#fff'};
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

const StyledModalOverlay = styled.div`
    background: rgba(0, 0, 0, 0.5);
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const StyledModalContent = styled.div`
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const StyledTabButton = styled.button`
    color: ${props => props.$theme?.style?.bodyTextColor || '#222'};
    
    &.active {
        color: ${props => props.$theme?.style?.primaryColor || '#222'};
        
        &:after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background: ${props => props.$theme?.style?.primaryColor || '#222'};
        }
    }
`;

const StyledCloseButton = styled.button`
    color: ${props => props.$theme?.style?.bodyTextColor || '#222'};
`;

const AddPage = ({ theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('addPage');

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <StyledAddButton 
                onClick={() => setIsOpen(true)}
                $theme={theme}
                className="fixed bottom-8 right-8 w-[50px] h-[50px] rounded-full border-none cursor-pointer flex items-center justify-center text-3xl shadow-md z-10"
            >
                +
            </StyledAddButton>

            <StyledModalOverlay 
                $isOpen={isOpen} 
                onClick={handleClose}
                className="fixed inset-0 z-50"
            >
                <StyledModalContent 
                    onClick={e => e.stopPropagation()}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-5 min-w-[300px] w-[35%] max-w-[500px] z-[51]"
                >
                    <StyledCloseButton 
                        onClick={handleClose}
                        $theme={theme}
                        className="absolute top-4 right-4 bg-transparent border-none cursor-pointer text-2xl"
                    >
                        ×
                    </StyledCloseButton>

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

                    <div className="mt-4">
                        {activeTab === 'addPage' ? (
                            <div>Add Page Form Content</div>
                        ) : (
                            <div>Edit Space Form Content</div>
                        )}
                    </div>
                </StyledModalContent>
            </StyledModalOverlay>
        </>
    );
};

export default AddPage; 