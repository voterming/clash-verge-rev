<<<<<<< HEAD
import { InfoRounded } from '@mui/icons-material'
=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
import {
  Tooltip,
  IconButton,
  IconButtonProps,
  SvgIconProps,
<<<<<<< HEAD
} from '@mui/material'

interface Props extends IconButtonProps {
  title?: string
  icon?: React.ElementType<SvgIconProps>
}

export const TooltipIcon: React.FC<Props> = (props: Props) => {
  const { title = '', icon: Icon = InfoRounded, ...restProps } = props
=======
} from "@mui/material";
import { InfoRounded } from "@mui/icons-material";

interface Props extends IconButtonProps {
  title?: string;
  icon?: React.ElementType<SvgIconProps>;
}

export const TooltipIcon: React.FC<Props> = (props: Props) => {
  const { title = "", icon: Icon = InfoRounded, ...restProps } = props;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <Tooltip title={title} placement="top">
      <IconButton color="inherit" size="small" {...restProps}>
<<<<<<< HEAD
        <Icon fontSize="inherit" style={{ cursor: 'pointer', opacity: 0.75 }} />
      </IconButton>
    </Tooltip>
  )
}
=======
        <Icon fontSize="inherit" style={{ cursor: "pointer", opacity: 0.75 }} />
      </IconButton>
    </Tooltip>
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
