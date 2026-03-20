<<<<<<< HEAD
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DeleteForeverRounded, UndoRounded } from '@mui/icons-material'
=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  alpha,
  styled,
<<<<<<< HEAD
} from '@mui/material'

import { useIconCache } from '@/hooks/use-icon-cache'
interface Props {
  type: 'prepend' | 'original' | 'delete' | 'append'
  group: IProxyGroupConfig
  onDelete: () => void
}

export const GroupItem = (props: Props) => {
  const { type, group, onDelete } = props
  const sortable = type === 'prepend' || type === 'append'

  const {
    attributes: sortableAttributes,
    listeners: sortableListeners,
    setNodeRef: sortableSetNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: group.name,
    disabled: !sortable,
  })
  const dragAttributes = sortable ? sortableAttributes : undefined
  const dragListeners = sortable ? sortableListeners : undefined
  const dragNodeRef = sortable ? sortableSetNodeRef : undefined

  const iconCachePath = useIconCache({
    icon: group.icon,
    cacheKey: group.name.replaceAll(' ', ''),
  })
=======
} from "@mui/material";
import { DeleteForeverRounded, UndoRounded } from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { downloadIconCache } from "@/services/cmds";
import { convertFileSrc } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
interface Props {
  type: "prepend" | "original" | "delete" | "append";
  group: IProxyGroupConfig;
  onDelete: () => void;
}

export const GroupItem = (props: Props) => {
  let { type, group, onDelete } = props;
  const sortable = type === "prepend" || type === "append";

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = sortable
    ? useSortable({ id: group.name })
    : {
        attributes: {},
        listeners: {},
        setNodeRef: null,
        transform: null,
        transition: null,
        isDragging: false,
      };

  const [iconCachePath, setIconCachePath] = useState("");

  useEffect(() => {
    initIconCachePath();
  }, [group]);

  async function initIconCachePath() {
    if (group.icon && group.icon.trim().startsWith("http")) {
      const fileName =
        group.name.replaceAll(" ", "") + "-" + getFileName(group.icon);
      const iconPath = await downloadIconCache(group.icon, fileName);
      setIconCachePath(convertFileSrc(iconPath));
    }
  }

  function getFileName(url: string) {
    return url.substring(url.lastIndexOf("/") + 1);
  }
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <ListItem
      dense
      sx={({ palette }) => ({
<<<<<<< HEAD
        position: 'relative',
        background:
          type === 'original'
            ? palette.mode === 'dark'
              ? alpha(palette.background.paper, 0.3)
              : alpha(palette.grey[400], 0.3)
            : type === 'delete'
              ? alpha(palette.error.main, 0.3)
              : alpha(palette.success.main, 0.3),
        height: '100%',
        margin: '8px 0',
        borderRadius: '8px',
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 'calc(infinity)' : undefined,
      })}
    >
      {group.icon && group.icon?.trim().startsWith('http') && (
        <img
          src={iconCachePath === '' ? group.icon : iconCachePath}
          width="32px"
          style={{
            marginRight: '12px',
            borderRadius: '6px',
          }}
        />
      )}
      {group.icon && group.icon?.trim().startsWith('data') && (
=======
        position: "relative",
        background:
          type === "original"
            ? palette.mode === "dark"
              ? alpha(palette.background.paper, 0.3)
              : alpha(palette.grey[400], 0.3)
            : type === "delete"
            ? alpha(palette.error.main, 0.3)
            : alpha(palette.success.main, 0.3),
        height: "100%",
        margin: "8px 0",
        borderRadius: "8px",
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? "calc(infinity)" : undefined,
      })}
    >
      {group.icon && group.icon?.trim().startsWith("http") && (
        <img
          src={iconCachePath === "" ? group.icon : iconCachePath}
          width="32px"
          style={{
            marginRight: "12px",
            borderRadius: "6px",
          }}
        />
      )}
      {group.icon && group.icon?.trim().startsWith("data") && (
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        <img
          src={group.icon}
          width="32px"
          style={{
<<<<<<< HEAD
            marginRight: '12px',
            borderRadius: '6px',
          }}
        />
      )}
      {group.icon && group.icon?.trim().startsWith('<svg') && (
        <img
          src={`data:image/svg+xml;base64,${btoa(group.icon ?? '')}`}
          width="32px"
          style={{
            marginRight: '12px',
            borderRadius: '6px',
          }}
        />
      )}
      <ListItemText
        {...(dragAttributes ?? {})}
        {...(dragListeners ?? {})}
        ref={dragNodeRef}
        sx={{ cursor: sortable ? 'move' : '' }}
        primary={
          <StyledPrimary
            sx={{ textDecoration: type === 'delete' ? 'line-through' : '' }}
=======
            marginRight: "12px",
            borderRadius: "6px",
          }}
        />
      )}
      {group.icon && group.icon?.trim().startsWith("<svg") && (
        <img
          src={`data:image/svg+xml;base64,${btoa(group.icon ?? "")}`}
          width="32px"
        />
      )}
      <ListItemText
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        sx={{ cursor: sortable ? "move" : "" }}
        primary={
          <StyledPrimary
            sx={{ textDecoration: type === "delete" ? "line-through" : "" }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          >
            {group.name}
          </StyledPrimary>
        }
        secondary={
          <ListItemTextChild
            sx={{
<<<<<<< HEAD
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              pt: '2px',
            }}
          >
            <Box sx={{ marginTop: '2px' }}>
=======
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              pt: "2px",
            }}
          >
            <Box sx={{ marginTop: "2px" }}>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
              <StyledTypeBox>{group.type}</StyledTypeBox>
            </Box>
          </ListItemTextChild>
        }
<<<<<<< HEAD
        slotProps={{
          secondary: {
            sx: {
              display: 'flex',
              alignItems: 'center',
              color: '#ccc',
            },
=======
        secondaryTypographyProps={{
          sx: {
            display: "flex",
            alignItems: "center",
            color: "#ccc",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          },
        }}
      />
      <IconButton onClick={onDelete}>
<<<<<<< HEAD
        {type === 'delete' ? <UndoRounded /> : <DeleteForeverRounded />}
      </IconButton>
    </ListItem>
  )
}

const StyledPrimary = styled('div')`
=======
        {type === "delete" ? <UndoRounded /> : <DeleteForeverRounded />}
      </IconButton>
    </ListItem>
  );
};

const StyledPrimary = styled("div")`
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
<<<<<<< HEAD
`

const ListItemTextChild = styled('span')`
  display: block;
`

const StyledTypeBox = styled(ListItemTextChild)(({ theme }) => ({
  display: 'inline-block',
  border: '1px solid #ccc',
=======
`;

const ListItemTextChild = styled("span")`
  display: block;
`;

const StyledTypeBox = styled(ListItemTextChild)(({ theme }) => ({
  display: "inline-block",
  border: "1px solid #ccc",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  borderColor: alpha(theme.palette.primary.main, 0.5),
  color: alpha(theme.palette.primary.main, 0.8),
  borderRadius: 4,
  fontSize: 10,
<<<<<<< HEAD
  padding: '0 4px',
  lineHeight: 1.5,
  marginRight: '8px',
}))
=======
  padding: "0 4px",
  lineHeight: 1.5,
  marginRight: "8px",
}));
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
