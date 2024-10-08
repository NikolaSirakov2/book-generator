'use client';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";

export const useBookGenerationSocket = () => {
    const { toast } = useToast();

    useEffect(() => {
        const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

        socket.on("book-generation-complete", (data) => {
            const existingTitles = JSON.parse(localStorage.getItem("creating_book") ?? "[]");
            let removedTitle = ""; 
            if (existingTitles.length > 0) {
                removedTitle = existingTitles.shift(); 
                localStorage.setItem("creating_book", JSON.stringify(existingTitles));
            }
            
            toast({
                title: `Book "${removedTitle}" generation complete!`, 
            });
        });

        return () => {
            socket.disconnect();
        };
    }, [toast]); 
};