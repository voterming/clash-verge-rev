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
interface Props {
  type: 'prepend' | 'original' | 'delete' | 'append'
  ruleRaw: string
  onDelete: () => void
}

export const RuleItem = (props: Props) => {
  const { type, ruleRaw, onDelete } = props
  const sortable = type === 'prepend' || type === 'append'
  const rule = ruleRaw.replace(',no-resolve', '')

  const ruleType = rule.match(/^[^,]+/)?.[0] ?? ''
  const proxyPolicy = rule.match(/[^,]+$/)?.[0] ?? ''
  const ruleContent = rule.slice(ruleType.length + 1, -proxyPolicy.length - 1)

  const $sortable = useSortable({ id: ruleRaw })
=======
} from "@mui/material";
import { DeleteForeverRounded, UndoRounded } from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface Props {
  type: "prepend" | "original" | "delete" | "append";
  ruleRaw: string;
  onDelete: () => void;
}

export const RuleItem = (props: Props) => {
  let { type, ruleRaw, onDelete } = props;
  const sortable = type === "prepend" || type === "append";
  const rule = ruleRaw.replace(",no-resolve", "");

  const ruleType = rule.match(/^[^,]+/)?.[0] ?? "";
  const proxyPolicy = rule.match(/[^,]+$/)?.[0] ?? "";
  const ruleContent = rule.slice(ruleType.length + 1, -proxyPolicy.length - 1);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = sortable
<<<<<<< HEAD
    ? $sortable
=======
    ? useSortable({ id: ruleRaw })
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    : {
        attributes: {},
        listeners: {},
        setNodeRef: null,
        transform: null,
        transition: null,
        isDragging: false,
<<<<<<< HEAD
      }
=======
      };
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
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      })}
    >
      <ListItemText
        {...attributes}
        {...listeners}
        ref={setNodeRef}
<<<<<<< HEAD
        sx={{ cursor: sortable ? 'move' : '' }}
        primary={
          <StyledPrimary
            title={ruleContent || '-'}
            sx={{ textDecoration: type === 'delete' ? 'line-through' : '' }}
          >
            {ruleContent || '-'}
=======
        sx={{ cursor: sortable ? "move" : "" }}
        primary={
          <StyledPrimary
            title={ruleContent || "-"}
            sx={{ textDecoration: type === "delete" ? "line-through" : "" }}
          >
            {ruleContent || "-"}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          </StyledPrimary>
        }
        secondary={
          <ListItemTextChild
            sx={{
<<<<<<< HEAD
              width: '62%',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'space-between',
              pt: '2px',
            }}
          >
            <Box sx={{ marginTop: '2px' }}>
              <StyledTypeBox>{ruleType}</StyledTypeBox>
            </Box>
            <StyledSubtitle sx={{ color: 'text.secondary' }}>
=======
              width: "62%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "space-between",
              pt: "2px",
            }}
          >
            <Box sx={{ marginTop: "2px" }}>
              <StyledTypeBox>{ruleType}</StyledTypeBox>
            </Box>
            <StyledSubtitle sx={{ color: "text.secondary" }}>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
              {proxyPolicy}
            </StyledSubtitle>
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

const StyledSubtitle = styled('span')`
=======
`;

const StyledSubtitle = styled("span")`
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  font-size: 13px;
  overflow: hidden;
  color: text.secondary;
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
