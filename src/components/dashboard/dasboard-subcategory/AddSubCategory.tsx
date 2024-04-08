"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'react-toastify';

interface Category {
    id: number;
    name: string;
}

const AddSubcategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('/api/subcategory', { name, description, categoryId });
            toast('Subcategory added successfully');
            setName('');
            setDescription('');
            setCategoryId('');
            setIsOpen(false);
        } catch (error) {
            toast('Failed to add subcategory');
            console.error('Error adding subcategory:', error);
        }
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)} variant={"secondary"}>Add Subcategory</Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Subcategory</DialogTitle>
                        <DialogDescription>
                            Please provide the details for the new subcategory.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                type="text"
                                placeholder="Subcategory Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Textarea
                                placeholder="Subcategory Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <Select value={categoryId} onValueChange={setCategoryId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category: Category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Add Subcategory</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddSubcategory;