import React, { useRef, useState } from 'react';
import { ScheduleComponent, WorkWeek, Week, Month, Inject, ViewsDirective, ViewDirective, Day, Agenda, DragAndDrop, Resize, PopupOpenEventArgs, ActionEventArgs } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Box } from '@mui/material';
import { useCreate, useDelete, useTable, useUpdate } from '@refinedev/core';
import { Button } from '@syncfusion/ej2-react-buttons';
import { createElement } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import '@syncfusion/ej2-base/styles/material.css';  // Pour le thème Material
import '@syncfusion/ej2-react-schedule/styles/material.css';  // Pour les composants spécifiques comme le calendrier
import { useNavigate } from 'react-router-dom';



const Calendar = () => {
    const { tableQueryResult: { data, isLoading, isError } } = useTable();
    const { mutate: createEvent } = useCreate();
    const { mutate: updateEvent } = useUpdate();
    const { mutate: deleteEvent } = useDelete();

    const scheduleObj = useRef<ScheduleComponent | null>(null);
    const navigate = useNavigate();


    if (isLoading) return <p>Loading events...</p>;
    if (isError) return <p>Error loading events.</p>;

    const allevents = data?.data;
    const formattedEvents = allevents?.map(event => ({
        Id: event._id, // Assurez-vous que ce champ existe dans votre schéma
        Subject: event.title,
        StartTime: event.startDate,
        EndTime: event.endDate,
        Location: event.location,
        Description: event.description,
        RecurrenceRule: event.recurrenceRule || null, // Ajoutez la règle de répétition ici
        initialBudget: event.initialBudget,
        importance: event.importance

    }));

    const eventSettings = { dataSource: formattedEvents };

    const editorFooterTemplate = () => {
        return (
            <div id="event-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div id="left-button">
                    <button id="Delete" className="e-control e-btn e-flat e-primary" data-ripple="true">
                        delete
                    </button>
                </div>
                <div id="right-button">
                    <button id="Details" className="e-control e-btn e-flat" data-ripple="true">
                        All Details
                    </button>
                    <button id="Save" className="e-control e-btn e-flat e-primary" data-ripple="true">
                        Save
                    </button>
                    <button id="Cancel" className="e-control e-btn e-flat " data-ripple="true">
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
    // const onDeleteClick = () => {
    //     const selectedEvent = scheduleRef.current?.getSelectedEvent();
    //     if (selectedEvent) {
    //         scheduleRef.current?.deleteEvent(selectedEvent);
    //     }
    // };

    // const onSaveClick = () => {
    //     const selectedEvent = scheduleRef.current?.getSelectedEvent();
    //     const updatedData = {
    //         Id: selectedEvent?.Id,
    //         Subject: document.getElementById('Subject')?.value,
    //         StartTime: document.getElementById('StartTime')?.ej2_instances[0].value,
    //         EndTime: document.getElementById('EndTime')?.ej2_instances[0].value,
    //         IsAllDay: (document.getElementById('IsAllDay') as HTMLInputElement)?.checked,
    //     };

    //     if (selectedEvent) {
    //         scheduleRef.current?.saveEvent(updatedData, 'Save');
    //     } else {
    //         scheduleRef.current?.addEvent(updatedData);
    //     }
    // };

    // const onCancelClick = () => {
    //     scheduleRef.current?.closeEditor();
    // };

    const onPopupOpen = (args: PopupOpenEventArgs): void => {

        if (args.type === 'Editor') {
            const formElement = args.element.querySelector('.e-schedule-form');
            setTimeout(() => {

                const deleteButton: HTMLElement = args.element.querySelector('#Delete') as HTMLElement;
                const detailsButton: HTMLElement = args.element.querySelector('#Details') as HTMLElement;
                const saveButton: HTMLElement = args.element.querySelector('#Save') as HTMLElement;
                const cancelButton: HTMLElement = args.element.querySelector('#Cancel') as HTMLElement;

                deleteButton.onclick = () => {
                    if (scheduleObj.current && args.data) {
                        deleteEvent(args.data[0]);
                        scheduleObj.current.closeEditor();

                    }
                };
                detailsButton.onclick = () => {
                    if (scheduleObj.current && args.data) {
                        navigate(`show/${args.data.Id}`)
                        scheduleObj.current.closeEditor();
                    }

                };
                saveButton.onclick = () => {
                    if (scheduleObj.current && args.data) {
                        const updatedData = {
                            ...args.data,
                            Subject: (document.querySelector('[name="Subject"]') as HTMLInputElement)?.value,
                            StartTime: (document.querySelector('[name="StartTime"]') as any)?.ej2_instances[0].value,
                            EndTime: (document.querySelector('[name="EndTime"]') as any)?.ej2_instances[0].value,
                            Location: (document.querySelector('[name="Location"]') as HTMLInputElement)?.value,
                            Description: (document.querySelector('[name="Description"]') as HTMLInputElement)?.value,
                            initialBudget: (document.querySelector('[name="initialBudget"]') as HTMLInputElement)?.value,
                            importance: (document.querySelector('[name="importance"]') as HTMLInputElement)?.value,
                            RecurrenceRule: (document.querySelector('[name="RecurrenceRule"]') as HTMLInputElement)?.value
                        };
                        if (args.data.Id) {
                            scheduleObj.current.saveEvent(updatedData); // Trigger save for updating the existing event
                        } else {
                            createEvent({
                                resource: 'events',
                                values: {
                                    title: updatedData.Subject,
                                    startDate: updatedData.StartTime,
                                    endDate: updatedData.EndTime,
                                    location: updatedData.Location,
                                    description: updatedData.Description,
                                    initialBudget: updatedData.initialBudget,
                                    importance: updatedData.importance,
                                    recurrenceRule: updatedData.RecurrenceRule,
                                },
                            });
                        }
                        scheduleObj.current.closeEditor();

                    }
                };

                cancelButton.onclick = () => {
                    if (scheduleObj.current) {
                        scheduleObj.current.closeEditor();
                    }
                };

            }, 100);

            // Vérifiez que formElement existe
            if (formElement && formElement.firstChild && !args.element.querySelector('.custom-field-row')) {
                let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
                formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);

                // Ajout du champ budget initial
                let budgetContainer: HTMLElement = createElement('div', { className: 'custom-field-container', styles: 'margin:15px 0' });
                let budgetInput: HTMLInputElement = createElement('input', {
                    className: 'e-field e-input',
                    attrs: { name: 'initialBudget', type: 'number', placeholder: 'Initial Budget' }
                }) as HTMLInputElement; // Type explicit pour HTMLInputElement
                budgetContainer.appendChild(budgetInput);
                row.appendChild(budgetContainer);

                // Assurez-vous que args.data est défini avant d'accéder à initialBudget
                if (args.data) {
                    budgetInput.value = args.data.initialBudget ? args.data.initialBudget.toString() : '';
                } else {
                    budgetInput.value = ''; // Valeur par défaut si args.data est indéfini
                }

                // Ajout du champ importance
                let importanceContainer: HTMLElement = createElement('div', { className: 'custom-field-container', styles: 'margin:15px 0' });
                let importanceLabel: HTMLElement = createElement('label', {
                    innerHTML: 'Importance:',
                    className: 'e-form-label',
                    styles: 'display: block; margin-bottom: 10px;'
                });
                importanceContainer.appendChild(importanceLabel);
                let importanceInput: HTMLInputElement = createElement('input', {
                    className: 'e-field e-input',
                    attrs: { name: 'importance' }
                }) as HTMLInputElement;
                importanceContainer.appendChild(importanceInput);
                row.appendChild(importanceContainer);

                let importanceDropDown: DropDownList = new DropDownList({
                    dataSource: [
                        { text: 'Critical', value: 'Critical' },
                        { text: 'High', value: 'High' },
                        { text: 'Medium', value: 'Medium' },
                        { text: 'Low', value: 'Low' },
                        { text: 'Very', value: 'Very' }
                    ],
                    fields: { text: 'text', value: 'value' },
                    value: args.data?.importance || 'Medium', // Utiliser l'opérateur de chaînage optionnel
                    floatLabelType: 'Always'
                });
                importanceDropDown.appendTo(importanceInput);
            }
        }
    };

    const onActionBegin = async (args: ActionEventArgs) => {
        try {
            if (args.data && Array.isArray(args.data) && args.data.length > 0) {
                if (args.requestType === 'eventCreate') {
                    // Créer un nouvel événement
                    createEvent({
                        resource: 'events', // Remplacez par votre project
                        values: {
                            title: args.data[0].Subject,
                            startDate: args.data[0].StartTime,
                            endDate: args.data[0].EndTime,
                            location: args.data[0].Location,
                            description: args.data[0].Description,
                            importance: args.data[0].importance,
                            initialBudget: args.data[0].initialBudget,
                            RecurrenceRule: args.data[0].RecurrenceRule
                        },
                    });
                } else if (args.requestType === 'eventRemove') {
                    // Modifier un événement existant
                    deleteEvent({
                        resource: 'events', // Remplacez par votre project
                        id: args.data[0].Id,
                    });
                }
            }
        } catch (error) {
            console.error("Erreur lors de la création ou de la mise à jour de l'événement:", error);
            args.cancel = true; // Annuler l'action si une erreur se produit
            alert("Une erreur s'est produite lors de l'ajout de l'événement. Veuillez réessayer."); // Optionnel : afficher un message d'erreur à l'utilisateur
        }
    };

    const onActionComplete = async (args: ActionEventArgs) => {
        try {
            if (args.data && Array.isArray(args.data) && args.data.length > 0) {
                if (args.requestType === 'eventChanged') {
                    console.log('Args change ', args);

                    // Modifier un événement existant
                    updateEvent({
                        resource: 'events', // Remplacez par votre project
                        id: args.data[0].Id,
                        values: {
                            title: args.data[0].Subject,
                            startDate: args.data[0].StartTime,
                            endDate: args.data[0].EndTime,
                            location: args.data[0].Location,
                            description: args.data[0].Description,
                            importance: args.data[0].importance,
                            initialBudget: args.data[0].initialBudget,
                            RecurrenceRule: args.data[0].RecurrenceRule
                        },
                    });
                }
            }
        } catch (error) {
            args.cancel = true; // Annuler l'action si une erreur se produit
            alert("Une erreur s'est produite lors de l'ajout de l'événement. Veuillez réessayer."); // Optionnel : afficher un message d'erreur à l'utilisateur
        }
    };

    return (
        <Box>
            <ScheduleComponent
                ref={scheduleObj}
                height='650px'
                eventSettings={eventSettings}
                editorFooterTemplate={editorFooterTemplate}
                popupOpen={onPopupOpen}
                actionComplete={onActionComplete}
                actionBegin={onActionBegin}

            >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
        </Box>
    )
}

export default Calendar