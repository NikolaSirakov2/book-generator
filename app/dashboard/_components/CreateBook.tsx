"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Smile, Trophy, SmilePlus, Laugh } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CreateBookProps {
  setUserInput: (input: string) => void;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBook: React.FC<CreateBookProps> = ({ openDialog, setOpenDialog }) => {
  const [localUserInput, setLocalUserInput] = useState("");

  const onCreatePage = () => {
    setOpenDialog(false);
    setLocalUserInput("");
  };

  return (
    <div>
      <Button className="bg-black text-white border-1 mt-10 lg:mr-4 rounded-full py-0 hover:bg-white hover:text-black" onClick={() => setOpenDialog(true)}>
        Create New Book
      </Button>
      <Dialog open={openDialog}>
        <DialogContent className="sm:w-3/4 sm:h-5/6">
          <DialogHeader className="flex flex-col">
            <DialogTitle className="mb-10 text-4xl">Book Creation</DialogTitle>
            <DialogDescription className="flex-grow">
              <h2 className="text-xl font-bold text-black mt-6">Book Title</h2>
              <Input
                id="title"
                defaultValue="Add your book title ..."
                className="col-span-3 mt-2"
              />
              <h2 className="text-xl font-bold text-black mt-6">Book Theme</h2>
              <textarea
                className="w-full h-60 p-3 mt-2 border-2"
                maxLength={300}
                placeholder="Add your book theme ..."
              ></textarea>
              <h2 className="text-xl font-bold text-black mt-6">
                Illustration level
              </h2>
              <div className="flex gap-4 mt-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="border rounded-lg shadow p-2 hover:border-blue-700 hover:border-2">
                    <Smile size={32} />
                  </div>
                  <p>Beginner</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="border rounded-lg shadow p-2 hover:border-blue-700 hover:border-2">
                    <Laugh size={32} />
                  </div>
                  <p>Intermedia</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="border rounded-lg shadow p-2 hover:border-blue-700 hover:border-2">
                    <SmilePlus size={32} />
                  </div>
                  <p>Advanced</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="border rounded-lg shadow p-2 hover:border-blue-700 hover:border-2">
                    <Trophy size={32} />
                  </div>
                  <p>Expert</p>
                </div>
              </div>
              <div>
                <Button
                  className="mt-8 bg-blue-500 hover:text-blue-500 hover:bg-white hover:border-2 transition duration-200"
                  onClick={onCreatePage}
                >
                  Create
                </Button>
                <Button
                  className="mt-8 ml-10 bg-red-500 transition duration-200"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBook;
