<<<<<<< HEAD
import {
  closestCenter,
  DndContext,
  DragEndEvent,
=======
import { useEffect, useRef, useState } from "react";
import { useVerge } from "@/hooks/use-verge";
import { Box, Button } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import {
  DndContext,
  closestCenter,
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
<<<<<<< HEAD
} from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Box, Button, Grid } from '@mui/material'
import { emit } from '@tauri-apps/api/event'
import { nanoid } from 'nanoid'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// test icons
import apple from '@/assets/image/test/apple.svg?raw'
import github from '@/assets/image/test/github.svg?raw'
import google from '@/assets/image/test/google.svg?raw'
import youtube from '@/assets/image/test/youtube.svg?raw'
import { BasePage } from '@/components/base'
import { ScrollTopButton } from '@/components/layout/scroll-top-button'
import { TestItem } from '@/components/test/test-item'
import { TestViewer, TestViewerRef } from '@/components/test/test-viewer'
import { useVerge } from '@/hooks/use-verge'

const TestPage = () => {
  const { t } = useTranslation()
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
  const { verge, mutateVerge, patchVerge } = useVerge()

  // test list
  const testList = useMemo(
    () =>
      verge?.test_list ?? [
        {
          uid: nanoid(),
          name: 'Apple',
          url: 'https://www.apple.com',
          icon: apple,
        },
        {
          uid: nanoid(),
          name: 'GitHub',
          url: 'https://www.github.com',
          icon: github,
        },
        {
          uid: nanoid(),
          name: 'Google',
          url: 'https://www.google.com',
          icon: google,
        },
        {
          uid: nanoid(),
          name: 'YouTube',
          url: 'https://www.youtube.com',
          icon: youtube,
        },
      ],
    [verge],
  )
=======
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { useTranslation } from "react-i18next";
import { BasePage } from "@/components/base";
import { TestViewer, TestViewerRef } from "@/components/test/test-viewer";
import { TestItem } from "@/components/test/test-item";
import { emit } from "@tauri-apps/api/event";
import { nanoid } from "nanoid";
import { ScrollTopButton } from "@/components/layout/scroll-top-button";

// test icons
import apple from "@/assets/image/test/apple.svg?raw";
import github from "@/assets/image/test/github.svg?raw";
import google from "@/assets/image/test/google.svg?raw";
import youtube from "@/assets/image/test/youtube.svg?raw";

const TestPage = () => {
  const { t } = useTranslation();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const { verge, mutateVerge, patchVerge } = useVerge();

  // test list
  const testList = verge?.test_list ?? [
    {
      uid: nanoid(),
      name: "Apple",
      url: "https://www.apple.com",
      icon: apple,
    },
    {
      uid: nanoid(),
      name: "GitHub",
      url: "https://www.github.com",
      icon: github,
    },
    {
      uid: nanoid(),
      name: "Google",
      url: "https://www.google.com",
      icon: google,
    },
    {
      uid: nanoid(),
      name: "Youtube",
      url: "https://www.youtube.com",
      icon: youtube,
    },
  ];
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  const onTestListItemChange = (
    uid: string,
    patch?: Partial<IVergeTestItem>,
  ) => {
    if (patch) {
      const newList = testList.map((x) => {
        if (x.uid === uid) {
<<<<<<< HEAD
          return { ...x, ...patch }
        }
        return x
      })
      mutateVerge({ ...verge, test_list: newList }, false)
    } else {
      mutateVerge()
    }
  }

  const onDeleteTestListItem = (uid: string) => {
    const newList = testList.filter((x) => x.uid !== uid)
    patchVerge({ test_list: newList })
    mutateVerge({ ...verge, test_list: newList }, false)
  }

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (over) {
      if (active.id !== over.id) {
        const old_index = testList.findIndex((x) => x.uid === active.id)
        const new_index = testList.findIndex((x) => x.uid === over.id)
        if (old_index < 0 || new_index < 0) {
          return
        }
        const newList = reorder(testList, old_index, new_index)
        await mutateVerge({ ...verge, test_list: newList }, false)
        await patchVerge({ test_list: newList })
      }
    }
  }

  useEffect(() => {
    if (!verge) return
    if (!verge?.test_list) {
      patchVerge({ test_list: testList })
    }
  }, [verge, patchVerge, testList])

  const viewerRef = useRef<TestViewerRef>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
=======
          return { ...x, ...patch };
        }
        return x;
      });
      mutateVerge({ ...verge, test_list: newList }, false);
    } else {
      mutateVerge();
    }
  };

  const onDeleteTestListItem = (uid: string) => {
    const newList = testList.filter((x) => x.uid !== uid);
    patchVerge({ test_list: newList });
    mutateVerge({ ...verge, test_list: newList }, false);
  };

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      if (active.id !== over.id) {
        let old_index = testList.findIndex((x) => x.uid === active.id);
        let new_index = testList.findIndex((x) => x.uid === over.id);
        if (old_index < 0 || new_index < 0) {
          return;
        }
        let newList = reorder(testList, old_index, new_index);
        await mutateVerge({ ...verge, test_list: newList }, false);
        await patchVerge({ test_list: newList });
      }
    }
  };

  useEffect(() => {
    if (!verge) return;
    if (!verge?.test_list) {
      patchVerge({ test_list: testList });
    }
  }, [verge]);

  const viewerRef = useRef<TestViewerRef>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
<<<<<<< HEAD
      behavior: 'smooth',
    })
  }

  const handleScroll = (e: any) => {
    setShowScrollTop(e.target.scrollTop > 100)
  }
=======
      behavior: "smooth",
    });
  };

  const handleScroll = (e: any) => {
    setShowScrollTop(e.target.scrollTop > 100);
  };
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <BasePage
      full
<<<<<<< HEAD
      title={t('tests.page.title')}
      header={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => emit('verge://test-all')}
          >
            {t('tests.page.actions.testAll')}
=======
      title={t("Test")}
      header={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => emit("verge://test-all")}
          >
            {t("Test All")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => viewerRef.current?.create()}
          >
<<<<<<< HEAD
            {t('shared.actions.new')}
=======
            {t("New")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          </Button>
        </Box>
      }
    >
      <Box
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          pt: 1.25,
          mb: 0.5,
<<<<<<< HEAD
          px: '10px',
          height: 'calc(100vh - 100px)',
          overflow: 'auto',
          position: 'relative',
=======
          px: "10px",
          height: "calc(100vh - 100px)",
          overflow: "auto",
          position: "relative",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <Box sx={{ mb: 4.5 }}>
<<<<<<< HEAD
            <Grid container spacing={{ xs: 1, lg: 1 }}>
              <SortableContext
                items={testList.map((x) => {
                  return x.uid
                })}
              >
                {testList.map((item) => (
                  <Grid
                    component={'div'}
=======
            <Grid2 container spacing={{ xs: 1, lg: 1 }}>
              <SortableContext
                items={testList.map((x) => {
                  return x.uid;
                })}
              >
                {testList.map((item) => (
                  <Grid2
                    component={"div"}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                    size={{ xs: 6, lg: 2, sm: 4, md: 3 }}
                    key={item.uid}
                  >
                    <TestItem
                      id={item.uid}
                      itemData={item}
                      onEdit={() => viewerRef.current?.edit(item)}
                      onDelete={onDeleteTestListItem}
                    />
<<<<<<< HEAD
                  </Grid>
                ))}
              </SortableContext>
            </Grid>
=======
                  </Grid2>
                ))}
              </SortableContext>
            </Grid2>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          </Box>
        </DndContext>

        <ScrollTopButton
          onClick={scrollToTop}
          show={showScrollTop}
          sx={{
<<<<<<< HEAD
            position: 'absolute',
            bottom: '20px',
            left: '20px',
=======
            position: "absolute",
            bottom: "20px",
            left: "20px",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            zIndex: 1000,
          }}
        />
      </Box>
      <TestViewer ref={viewerRef} onChange={onTestListItemChange} />
    </BasePage>
<<<<<<< HEAD
  )
}

export default TestPage
=======
  );
};

export default TestPage;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
