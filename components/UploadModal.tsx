"use client";

import uniqid from "uniqid";
import toast from "react-hot-toast";
import Select from "react-select";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset, control } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      artist: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();

      // Check if the artist exists
      let { data: artist, error: artistError } = await supabaseClient
        .from("artists")
        .select("id")
        .ilike("artist_name", values.artist)
        .single();

      // Handle no artist found error
      if (artistError && artistError.code === "PGRST116") {
        artistError = null; // Reset error as it's an expected outcome
      }

      // If the artist doesn't exist, create a new artist
      if (!artist && !artistError) {
        const result = await supabaseClient
          .from("artists")
          .insert([{ artist_name: values.artist }])
          .single();

        artist = result.data;
        artistError = result.error;
      }

      if (artistError) {
        setIsLoading(false);
        return toast.error("Failed to create artist");
      }

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed to upload song");
      }

      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed to upload image");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user?.id,
          title: values.title,
          artist: values.artist,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error("Failed to upload song");
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Controller
          name="artist"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              options={[
                { value: "artist1", label: "Artist 1" },
                { value: "artist2", label: "Artist 2" },
                { value: "artist3", label: "Artist 3" },
                { value: "artist4", label: "Artist 4" },
                { value: "artist5", label: "Artist 5" },
              ]}
            />
          )}
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an image file</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
