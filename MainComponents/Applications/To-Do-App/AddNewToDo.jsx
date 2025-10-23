import React, { useState } from "react";
import { useSelector } from "react-redux";
import SelectItems from "../../../GenericComponents/SelectItems";
import Categories from "./Categories";
import Priority from "./Priority";
import RelatedGoal from "./RelatedGoal";
import Cog8ToothIcon from "@heroicons/react/20/solid/Cog8ToothIcon";
import { FLEX_BTW } from "../../../ClassNames";
import { twMerge } from "tailwind-merge";
import ToggleBtn from "../../../GenericComponents/ToggleBtn";
import AddNewForm from "../../../GenericComponents/AddNewForm";
import FormModal from "../../../GenericComponents/FormModal";
import useNewTodo from "../../../hooks/useNewTodo";
import Related from "../../../GenericComponents/Related";
import { DeadlinePeriod } from "../../../features/GoalSlice/GoalHelpers";

const AddNewToDo = ({ isMobOrTab }) => {
    const [openSettings, setOpenSettings] = useState(false);

    const { categories, currentCategory, goal, relatedToGoal } = useSelector(
        (state) => state.todo
    );
    const { goalsList } = useSelector((state) => state.goals);
    console.log("goalsList:", goalsList);

    const filteredGoals = goalsList.filter(
        (goal) =>
            DeadlinePeriod(goal.deadline) !== "overdue" &&
            goal.totalSteps > goal.completedSteps
    );

    const hookData = useNewTodo(isMobOrTab, filteredGoals);

    function handleSettings() {
        setOpenSettings(!openSettings);
    }

    return (
        <FormModal styles={"bg-yellow-100"}>
            <div className="border-3 w-20 h-5 sticky top-0 -translate-y-5 left-18 z-10"></div>
            <AddNewForm
                handleNew={hookData.handleNewTodo}
                holder="To-Do Task"
                value={hookData.todoName}
                onChange={hookData.handleNewName}
                text="Add To-Do"
                className="space-y-2 mb-1"
            >
                <div className="mt-6 lg:mt-1 space-y-4">
                    <div className={twMerge(" gap-3", FLEX_BTW)}>
                        <SelectItems 
                            value={currentCategory}
                            onChange={hookData.handleCurrentCategory}
                            defaultItem="category"
                            items={categories}
                        />
                        <ToggleBtn
                            titles={["Close", "Open"]}
                            classNames={["size-8 border rounded-sm bg-white", ""]}
                            state={openSettings}
                            handler={handleSettings}
                            Icon={Cog8ToothIcon}
                            size={"size-5"}
                        />
                    </div>
                    {openSettings && <Categories />}
                    <Priority />
                    <Related
                        legend="Does This Task Relate To A Goal?"
                        value={goal}
                        onChange={hookData.handleRelateChange}
                        items={filteredGoals}
                        onRadioChange={hookData.handleRadioChange}
                        doesRelate={relatedToGoal === "yes"}
                    />
                </div>
            </AddNewForm>
        </FormModal>
    );
};

export default AddNewToDo;
