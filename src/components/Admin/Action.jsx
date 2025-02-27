"use client"
import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { HiDotsVertical } from "react-icons/hi";
import SubmitButton from '../Form/SubmitButton';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function Actions({children,id=null,className,actions=[]}) {
    actions.push( { name: 'Copy', task:()=>{navigator.clipboard.writeText(id);}})
    return (
        <div className={`${className}`}>
            <Menu as="div" className={`relative inline-block text-left `}>
                <div>
                    <Menu.Button className="mx-auto">
                    <HiDotsVertical />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          { actions.map((act,index)=> <Menu.Item key={index}>
                                {({ active }) => (
                                    <button
                                        onClick={act?.task}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm w-full'
                                        )}
                                    >
                                        {act.name}
                                    </button>
                                )}
                            </Menu.Item>)}

                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default Actions
