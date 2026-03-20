<<<<<<< HEAD
import { styled } from '@mui/material'

const Loading = styled('div')`
=======
import { styled } from "@mui/material";

const Loading = styled("div")`
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  position: relative;
  display: flex;
  height: 100%;
  min-height: 18px;
  box-sizing: border-box;
  align-items: center;

  & > div {
    box-sizing: border-box;
    width: 6px;
    height: 6px;
    margin: 2px;
    border-radius: 100%;
    animation: loading 0.7s -0.15s infinite linear;
  }

  & > div:nth-child(2n-1) {
    animation-delay: -0.5s;
  }

  @keyframes loading {
    50% {
      opacity: 0.2;
      transform: scale(0.75);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
<<<<<<< HEAD
`

const LoadingItem = styled('div')(({ theme }) => ({
  background: theme.palette.text.secondary,
}))
=======
`;

const LoadingItem = styled("div")(({ theme }) => ({
  background: theme.palette.text.secondary,
}));
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

export const BaseLoading = () => {
  return (
    <Loading>
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
    </Loading>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
