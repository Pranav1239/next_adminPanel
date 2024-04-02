
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post('/api/category', { name, description });
            toast('Category added successfully');
            setName('');
            setDescription('');
            setIsOpen(false);
        } catch (error) {
            toast('Failed to add category');
            console.error('Error adding category:', error);
        }
    };

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Add Category</Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Category</DialogTitle>
                        <DialogDescription>
                            Please provide the details for the new category.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                type="text"
                                placeholder="Category Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Textarea
                                placeholder="Category Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Add Category</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddCategory;