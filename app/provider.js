"use client";
import React, { useContext, useEffect, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ScreensizeContext } from "@/context/ScreenSizeContext";
import { DragDropLayoutElement } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { SelectedElementContext } from "@/context/SelectedElementContext";

function Provider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  const [userDetail, setUserDetail] = useState();
  const [screenSize, setScreenSize] = useState("desktop");
  const [dragElementLayout, setDragElementLayout] = useState();
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedElement, setSelectedElement] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safely parse userDetail
      let storage = {};
      try {
        storage = JSON.parse(localStorage.getItem("userDetail") || "{}");
      } catch (err) {
        console.error("Failed to parse userDetail from localStorage", err);
        storage = {};
      }

      // Safely parse emailTemplate
      let emailTemplateStorage = [];
      try {
        emailTemplateStorage = JSON.parse(
          localStorage.getItem("emailTemplate") || "[]"
        );
        if (!Array.isArray(emailTemplateStorage)) {
          emailTemplateStorage = [];
        }
      } catch (err) {
        console.error("Failed to parse emailTemplate from localStorage", err);
        emailTemplateStorage = [];
      }

      setEmailTemplate(emailTemplateStorage);

      // Redirect or set user
      if (!storage || !storage.email) {
        // redirect the user to home screen
      } else {
        setUserDetail(storage);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate]);

  useEffect(() => {
    if (selectedElement) {
      let updatedEmailTemplates = [];

      emailTemplate.forEach((item, index) => {
        if (item?.id === selectedElement?.layout?.id) {
          updatedEmailTemplates?.push(selectedElement?.layout);
        } else {
          updatedEmailTemplates?.push(item);
        }
      });
      setEmailTemplate(updatedEmailTemplates);
    }
  }, [selectedElement]);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <ScreensizeContext.Provider value={{ screenSize, setScreenSize }}>
            <DragDropLayoutElement.Provider
              value={{ dragElementLayout, setDragElementLayout }}
            >
              <EmailTemplateContext.Provider
                value={{ emailTemplate, setEmailTemplate }}
              >
                <SelectedElementContext.Provider
                  value={{ selectedElement, setSelectedElement }}
                >
                  <div>{children}</div>
                </SelectedElementContext.Provider>
              </EmailTemplateContext.Provider>
            </DragDropLayoutElement.Provider>
          </ScreensizeContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}

export default Provider;

//This is the useUserDeatail Hook
export const useUserDeatail = () => {
  return useContext(UserDetailContext);
};

export const useScreenSize = () => {
  return useContext(ScreensizeContext);
};

export const useDragElementLayout = () => {
  return useContext(DragDropLayoutElement);
};

export const useEmailTemplate = () => {
  return useContext(EmailTemplateContext);
};

export const useSelectedElement = () => {
  return useContext(SelectedElementContext);
};
