"use client";

import React, { useState, useEffect } from 'react';

export default function Snackbar({
    message,
    visible,
  }: {
    message: string;
    visible: boolean;
  })  {

  return visible ? (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center items-center">
      <div className="bg-black bg-opacity-75 text-white p-4 rounded-lg transition-opacity duration-500">
        <span>{message}</span>
      </div>
    </div>
  ) : null;
  
}