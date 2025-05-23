import Loading from "@/components/common/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Story } from "@/redux/slices/storySlice";
import {
  // fetchFollowingStoriesThunk,
  fetchStoriesThunk,
  // fetchTrendingStoriesThunk,
} from "@/redux/thunk/story.thunk";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import StoryPreview from "./[storyId]";
// import { useEffect, useState } from "react";

const Stories = () => {
  const dispatch = useAppDispatch();
  const { loading, followingStories, stories, viewedStories } = useAppSelector(
    (state) => state.story
  );
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // dispatch(fetchTrendingStoriesThunk());
    // dispatch(fetchFollowingStoriesThunk());
    dispatch(fetchStoriesThunk());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : isPreview ? (
    <StoryPreview setIsPreview={setIsPreview} storyData={stories?.[0]} />
  ) : (
    <div style={{ position: "relative" }}>
      <Box sx={{ px: "16px", py: "24px" }}>
        {/* <StoryCard handleOpen={handleOpen} myStory={true} /> */}
      </Box>
      <Divider />
      <Stack sx={{ gap: "36px", pt: "36px", pb: 12 }}>
        {[
          {
            title: "Trending Stories",
            icon: "/images/trending-stories.svg",
            array: stories,
          },
          {
            title: "Recent Stories",
            icon: "/images/recent-stories.svg",
            array: viewedStories,
          },
          {
            title: "Following Stories",
            icon: "/images/following-stories.svg",
            array: followingStories,
          },
        ].map((item, index) => (
          <StorySection
            key={index}
            title={item.title}
            icon={item.icon}
            array={item.array}
            setIsPreview={setIsPreview}
          />
        ))}
      </Stack>
    </div>
  );
};

export default Stories;

interface StoryCardProps {
  myStory?: boolean;
  handleOpen: () => void;
  storyData: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({
  myStory = false,
  handleOpen,
  storyData,
}) => {
  return (
    <Stack
      onClick={handleOpen}
      spacing={myStory ? 4 : 2}
      direction={myStory ? "row" : "column"}
      sx={{
        alignItems: "center",
        minWidth: "90px",
        maxWidth: "90px",
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          border: "2px solid red",
          width: "70px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={storyData?.uploadImagesForStory?.[0]}
          alt="story"
          height={66}
          width={66}
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      </Box>
      {myStory ? (
        <Typography sx={{ color: "#1F2937", fontWeight: 600 }}>
          My Story
        </Typography>
      ) : (
        <Stack sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "14px", color: "#1F2937" }}>
            Bmw motor garage sale
          </Typography>
          <Typography sx={{ fontSize: "10px", color: "#9CA3AF" }}>
            {formatDistanceToNow(new Date(storyData?.createdAt)) ||
              "1 hour ago"}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

interface StorySectionProps {
  title: string;
  icon: string;
  array: Story[];
  setIsPreview: (value: boolean) => void;
}

const StorySection: React.FC<StorySectionProps> = ({
  title,
  icon,
  array,
  setIsPreview,
}) => {
  const handleOpen = (id: string) => {
    // router.push(`/story/${id}`)
    console.log(id);
    setIsPreview(true);
  };
  return (
    <Stack spacing={4} sx={{ px: "16px" }}>
      {array?.length > 0 && (
        <Stack direction={"row"} spacing={2}>
          <Image src={icon} width={20} height={20} alt={title} />
          <Typography sx={{ color: "#1F2937", fontWeight: 600 }}>
            {title}
          </Typography>
        </Stack>
      )}
      <Box
        sx={{
          display: "flex",
          overflow: "auto",
          gap: "24px",
          alignItems: "center",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {array.map((item, index) => (
          <StoryCard
            storyData={item}
            handleOpen={() => handleOpen(item.id)}
            key={index}
          />
        ))}
      </Box>
    </Stack>
  );
};
