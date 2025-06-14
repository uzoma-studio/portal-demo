import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { createPage, updatePage } from '../../../data/createContent.server'
import { useSpace } from '@/context/SpaceProvider';
import { generateSlug } from '@/utils/helpers';
import RichTextEditor from './RichTextEditor'
import themeSettings from '../../../themeSettings.json';
import { StyledMessage } from '@/styles/rootStyles';

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
    
    &:hover:not(:disabled) {
        opacity: 0.9;
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
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

const StyledColorInput = styled.input`
    padding: 0.25rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    width: 100%;
    height: 2.5rem;
    
    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }
    
    &::-webkit-color-swatch {
        border: none;
        border-radius: 0.25rem;
    }
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

const StyledColorLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
`;

const StyledColorPreview = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ddd;
`;

const AddPage = ({ setIsModalOpen, isCreatePageMode, pageData, setIsEditMode }) => {
    const { space, setPages } = useSpace()

    const [pageBodyField, setPageBodyField] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    const buttonText = isCreatePageMode ? { default: 'Create', active: 'Creating'} : { default: 'Edit', active: 'Editing'}

    const [formData, setFormData] = useState({
        title: pageData?.title || '',
        contentType: pageData?.contentType || '',
        body: pageData?.body || null,
        space,
        themeConfig: {
            position: pageData?.themeConfig?.position || {
                x: 50,
                y: 50
            },
            size: pageData?.themeConfig?.size || {
                width: 600,
                height: 500
            },
            displayMode: pageData?.themeConfig?.displayMode || themeSettings.style.defaultPageDisplayMode,
            hotspotName: pageData?.themeConfig?.hotspotName || '',
            style: {
                ...themeSettings.style.defaultPageStyles,
                ...pageData?.themeConfig?.style,
                backgroundImage: pageData?.themeConfig?.style?.backgroundImage || null
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
        // Prevents the modal button from still showing up after edits have been made (set in @renderSinglePageContent)
        !isCreatePageMode && setIsEditMode(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });
        
        if(isCreatePageMode){
            try {
                const slug = generateSlug(formData.title);
                const pageData = {
                    ...formData,
                    slug
                };

                const res = await createPage(pageData);
                
                if (res?.id) {
                    setMessage({ 
                        type: 'success', 
                        text: 'Page created successfully!' 
                    });
                    setTimeout(() => {
                        handleClose();
                    }, 1500); // Give user time to see success message
                } else {
                    setMessage({ 
                        type: 'error', 
                        text: 'Failed to create page. Please try again.' 
                    });
                }
            } catch (error) {
                console.error('Error creating page:', error);
                setMessage({ 
                    type: 'error', 
                    text: error.message || 'An error occurred while creating the page.' 
                });
            } 
        } else {
            try {
                const updatedPage = await updatePage(pageData.id, formData);
                
                if (updatedPage?.id) {
                    setPages(prevPages => 
                        prevPages.map(page => 
                          page.id === updatedPage.id ? updatedPage : page
                        )
                    );

                    setMessage({ 
                        type: 'success', 
                        text: 'Page edited successfully!' 
                    });
                    setTimeout(() => {
                        handleClose();
                    }, 1500); // Give user time to see success message
                } else {
                    setMessage({ 
                        type: 'error', 
                        text: 'Failed to edit page. Please try again.' 
                    });
                }
            } catch (error) {
                console.error('Error editing page:', error);
                setMessage({ 
                    type: 'error', 
                    text: error.message || 'An error occurred while editing the page.' 
                });
            } 
        }
        
        setIsSubmitting(false);
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
                    <RichTextEditor 
                        name="body" 
                        setPageBodyField={setPageBodyField} 
                        initialContent={pageData?.body}
                    />
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

                    <div className="mb-4">
                        <StyledLabel className="block mb-2">
                            Colors
                        </StyledLabel>
                        <StyledSettingsGrid>
                            <div>
                                <StyledColorLabel>
                                    <StyledColorPreview style={{ backgroundColor: formData.themeConfig.style.backgroundColor }} />
                                    <StyledLabel className="block text-sm">
                                        Background Color
                                    </StyledLabel>
                                </StyledColorLabel>
                                <StyledColorInput
                                    type="color"
                                    value={formData.themeConfig.style.backgroundColor}
                                    onChange={(e) => handleThemeConfigChange('style', 'backgroundColor', e.target.value)}
                                />
                            </div>
                            <div>
                                <StyledColorLabel>
                                    <StyledColorPreview style={{ backgroundColor: formData.themeConfig.style.textColor }} />
                                    <StyledLabel className="block text-sm">
                                        Text Color
                                    </StyledLabel>
                                </StyledColorLabel>
                                <StyledColorInput
                                    type="color"
                                    value={formData.themeConfig.style.textColor}
                                    onChange={(e) => handleThemeConfigChange('style', 'textColor', e.target.value)}
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

                {message.text && (
                    <StyledMessage className={message.type}>
                        {message.text}
                    </StyledMessage>
                )}

                <StyledSubmitButton 
                    type="submit" 
                    className="mt-4 px-6 py-3 rounded font-medium"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? `${buttonText.active}...` : `${buttonText.default} Page`}
                </StyledSubmitButton>
            </StyledForm>
        </div>
    );
};

export default AddPage; 