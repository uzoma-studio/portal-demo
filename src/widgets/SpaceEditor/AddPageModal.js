import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { createPage } from '../../../data/createContent.server'
import { SpaceContext } from '@/context/SpaceProvider';
import { generateSlug } from '@/utils/helpers';
import { SimpleEditor } from '@/tiptap/components/tiptap-templates/simple/simple-editor'

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const StyledLabel = styled.label`
    color: var(--body-text-color);
    font-weight: 500;
`;

const StyledInput = styled.input`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

const StyledSelect = styled.select`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

const StyledTextArea = styled.textarea`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    min-height: 150px;
    resize: vertical;
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

const StyledSubmitButton = styled.button`
    background: var(--primary-color);
    color: var(--accent-color);
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 500;
    transition: opacity 0.2s ease;
    
    &:hover {
        opacity: 0.9;
    }
`;

const AddPage = ({ setIsModalOpen }) => {
    const context = useContext(SpaceContext)
    const space = context.space

    const [formData, setFormData] = useState({
        title: '',
        contentType: '',
        body: null,
        space,
        themeConfig: {
            position: {
                x: 50,
                y: 50
            }
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditorUpdate = (editor) => {
        const content = editor.getJSON();
        setFormData(prev => ({
            ...prev,
            body: content
        }));
    };

    const handleClose = () => {
        setIsModalOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        // try {
        //     const slug = generateSlug(formData.title);
        //     const pageData = {
        //         ...formData,
        //         slug
        //     };

        //     await createPage(pageData);
        //     handleClose();
        // } catch (error) {
        //     console.error('Error creating page:', error);
        //     // TODO: Add error handling UI
        // }
    };

    return (
       <div className="mt-4">
            <StyledForm onSubmit={handleSubmit}>
                <div>
                    <StyledLabel htmlFor="title" className="block mb-2">
                        Page Title
                    </StyledLabel>
                    <StyledInput
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <StyledLabel htmlFor="contentType" className="block mb-2">
                        Content Type
                    </StyledLabel>
                    <StyledSelect
                        id="contentType"
                        name="contentType"
                        value={formData.contentType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded"
                    >
                        <option value="">Select a content type</option>
                        <option value="page">Page</option>
                        <option value="blog">Blog</option>
                        <option value="files">Files</option>
                        <option value="chatbot">Chatbot</option>
                        <option value="chat-messages">Chat</option>
                        <option value="products">Shop</option>
                    </StyledSelect>
                </div>

                <div>
                    <StyledLabel htmlFor="body" className="block mb-2">
                        Page Content
                    </StyledLabel>
                    <SimpleEditor onUpdate={handleEditorUpdate} />
                </div>

                <StyledSubmitButton 
                    type="submit" 
                    className="mt-4 px-6 py-3 rounded font-medium"
                >
                    Create Page
                </StyledSubmitButton>
            </StyledForm>
        </div>
    );
};

export default AddPage; 