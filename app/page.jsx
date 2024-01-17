"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "@chakra-ui/next-js";
export default function Page() {
  const [currentTodo, setCurrentTodo] = useState({});
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [todos, setTodos] = useState(
    JSON?.parse(localStorage.getItem("todos") || "[]")
  );

  function randomId() {
    return Math.round(Math.random() * 10_000_000);
  }

  function handleDeleteTodo(todoIndex) {
    const tempTodos = Array.from(todos);
    tempTodos[todoIndex] = null;
    const result = tempTodos.filter((todo) => todo !== null);

    setTodos(result);
  }

  function handleEditTodo(todoIndex) {
    setIsEditOpen(todoIndex);
    setCurrentTodo(todos[todoIndex]);
  }
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <main className="bg-white h-full">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <Heading size="md">Todo</Heading>
            <Button
              onClick={() => {
                setIsCreateOpen(true);
              }}
              colorScheme="facebook"
            >
              Create
            </Button>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {todos.map((todo, index) => (
                <Box key={todo - `${index}`} className="flex">
                  <Box className="flex flex-col">
                    <Heading size="md" textTransform="uppercase">
                      <Link href={`/todo/${todo?.id}`}>{todo?.title}</Link>
                    </Heading>
                    <Text fontSize="xs">
                      Deadline: {new Date(todo?.endTime)?.toDateString?.()}
                    </Text>
                    <Text pt="2" fontSize="md">
                      {todo?.desc}
                    </Text>
                  </Box>

                  <Box className="ml-auto flex items-center">
                    <Button
                      onClick={() => handleEditTodo(index)}
                      colorScheme="yellow"
                    >
                      Edit
                    </Button>

                    <Button
                      className="ml-2"
                      colorScheme="red"
                      onClick={() => handleDeleteTodo(index)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
        {/** Modal create */}
        <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Title"
                  onInput={(e) => {
                    setCurrentTodo((todo) => ({
                      ...todo,
                      title: e.target.value,
                    }));
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Description"
                  onInput={(e) => {
                    setCurrentTodo((todo) => ({
                      ...todo,
                      desc: e.target.value,
                    }));
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="datetime-local"
                  onInput={(e) => {
                    setCurrentTodo((todo) => ({
                      ...todo,
                      endTime: new Date(e.target.value).getTime(),
                    }));
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  setTodos((todos) => [
                    ...todos,
                    {
                      id: randomId(),
                      ...currentTodo,
                    },
                  ]);
                  setIsCreateOpen(false);
                  setCurrentTodo({});
                }}
              >
                Save
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/** Modal delete */}
        <Modal
          isOpen={isEditOpen !== false}
          onClose={() => setIsEditOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  defaultValue={currentTodo?.title}
                  placeholder="Title"
                  onInput={(e) => {
                    setCurrentTodo((todo) => ({
                      ...todo,
                      title: e.target.value,
                    }));
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  defaultValue={currentTodo?.desc}
                  placeholder="Description"
                  onInput={(e) => {
                    setCurrentTodo((todo) => ({
                      ...todo,
                      desc: e.target.value,
                    }));
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>End Time</FormLabel>
                <Input
                  defaultValue={currentTodo?.endTime}
                  type="datetime-local"
                  onInput={(e) => {
                    setCurrentTodo((todo) => ({
                      ...todo,
                      endTime: new Date(e.target.value),
                    }));
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  const newTodos = Array.from(todos);
                  newTodos[isEditOpen] = currentTodo;
                  setTodos(newTodos);
                  setIsEditOpen(false);
                }}
              >
                Save
              </Button>
              <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </>
  );
}
