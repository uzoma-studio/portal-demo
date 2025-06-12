import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { createPage } from '../../../data/createContent.server'
import { SpaceContext } from '@/context/SpaceProvider';
import { generateSlug } from '@/utils/helpers';
import RichTextEditor from './RichTextEditor'
import themeSettings from '../../../themeSettings.json';

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

const StyledNumberInput = styled.input`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    width: 100%;
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

const StyledSettingsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;

const StyledSettingsSection = styled.div`
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
`;

const AddPage = ({ setIsModalOpen }) => {
    const context = useContext(SpaceContext)
    const space = context.space

    const [pageBodyField, setPageBodyField] = useState(null)

    const [formData, setFormData] = useState({
        title: '',
        contentType: '',
        body: null,
        space,
        themeConfig: {
            position: {
                x: 50,
                y: 50
            },
            size: {
                width: 600,
                height: 500
            },
            displayMode: themeSettings.style.defaultPageDisplayMode,
            hotspotName: '',
            style: {
                ...themeSettings.style.defaultPageStyles,
                backgroundImage: null
            }
        }
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            body: pageBodyField
        }));
    }, [pageBodyField]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleThemeConfigChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            themeConfig: {
                ...prev.themeConfig,
                // set up to handle nested {position: {x: '', y: ''} and direct {displayMode: "icon"} fields
                [section]: field ? {
                    ...prev.themeConfig[section],
                    [field]: value
                } : value
            }
        }));
    };

    const handleClose = () => {
        setIsModalOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {            
            const slug = generateSlug(formData.title);
            const pageData = {
                ...formData,
                slug
            };

            await createPage(pageData);
            handleClose();
        } catch (error) {
            console.error('Error creating page:', error);
            // TODO: Add error handling UI
        }
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
                    <RichTextEditor name="body" setPageBodyField={setPageBodyField} />
                </div>

                <StyledSettingsSection>
                    <StyledLabel className="block mb-4">
                        Page Settings
                    </StyledLabel>

                    <div className="mb-4">
                        <StyledLabel className="block mb-2">
                            Display Mode
                        </StyledLabel>
                        <StyledSelect
                            value={formData.themeConfig.displayMode}
                            onChange={(e) => handleThemeConfigChange('displayMode', null, e.target.value)}
                            className="w-full"
                        >
                            <option value="icon">Icon</option>
                            <option value="hotspot">Hotspot</option>
                            <option value="list">List</option>
                            <option value="island">Island</option>
                            <option value="windows">Window</option>
                        </StyledSelect>
                    </div>

                    <div className="mb-4">
                        <StyledLabel className="block mb-2">
                            Position
                        </StyledLabel>
                        <StyledSettingsGrid>
                            <div>
                                <StyledLabel className="block text-sm mb-1">
                                    X Position (0-100)
                                </StyledLabel>
                                <StyledNumberInput
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.themeConfig.position.x}
                                    onChange={(e) => handleThemeConfigChange('position', 'x', parseInt(e.target.value))}
                                />
                            </div>
                            <div>
                                <StyledLabel className="block text-sm mb-1">
                                    Y Position (0-100)
                                </StyledLabel>
                                <StyledNumberInput
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.themeConfig.position.y}
                                    onChange={(e) => handleThemeConfigChange('position', 'y', parseInt(e.target.value))}
                                />
                            </div>
                        </StyledSettingsGrid>
                    </div>

                    <div className="mb-4">
                        <StyledLabel className="block mb-2">
                            Size
                        </StyledLabel>
                        <StyledSettingsGrid>
                            <div>
                                <StyledLabel className="block text-sm mb-1">
                                    Width (px)
                                </StyledLabel>
                                <StyledNumberInput
                                    type="number"
                                    min="100"
                                    value={formData.themeConfig.size.width}
                                    onChange={(e) => handleThemeConfigChange('size', 'width', parseInt(e.target.value))}
                                />
                            </div>
                            <div>
                                <StyledLabel className="block text-sm mb-1">
                                    Height (px)
                                </StyledLabel>
                                <StyledNumberInput
                                    type="number"
                                    min="100"
                                    value={formData.themeConfig.size.height}
                                    onChange={(e) => handleThemeConfigChange('size', 'height', parseInt(e.target.value))}
                                />
                            </div>
                        </StyledSettingsGrid>
                    </div>

                    {formData.themeConfig.displayMode === 'hotspot' && (
                        <div className="mb-4">
                            <StyledLabel className="block mb-2">
                                Hotspot Name
                            </StyledLabel>
                            <StyledInput
                                type="text"
                                value={formData.themeConfig.hotspotName}
                                onChange={(e) => handleThemeConfigChange('hotspotName', null, e.target.value)}
                                className="w-full"
                                placeholder="Enter hotspot name"
                            />
                        </div>
                    )}
                </StyledSettingsSection>

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