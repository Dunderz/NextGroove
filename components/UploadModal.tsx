"use client";

import uniqid from "uniqid";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

const UploadModal = () => {
  return <div>UploadModal</div>;
};

export default UploadModal;
