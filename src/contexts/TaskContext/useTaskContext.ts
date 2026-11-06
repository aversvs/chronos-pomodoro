import { useContext } from "react";
import { TaskContext } from "./TaskContent";


export function useTaskContext(){
    return useContext(TaskContext);
}