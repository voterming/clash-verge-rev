<<<<<<< HEAD
import {
  PlayCircleOutlineRounded,
  PauseCircleOutlineRounded,
  SwapVertRounded,
} from '@mui/icons-material'
import { Box, Button, IconButton, MenuItem } from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Virtuoso } from 'react-virtuoso'

import {
  BaseEmpty,
  BasePage,
  BaseSearchBox,
  BaseStyledSelect,
  type SearchState,
} from '@/components/base'
import LogItem from '@/components/log/log-item'
import { useClashLog } from '@/hooks/use-clash-log'
import { useLogData } from '@/hooks/use-log-data'

const LogPage = () => {
  const { t } = useTranslation()
  const [clashLog, setClashLog] = useClashLog()
  const enableLog = clashLog.enable
  const logState = clashLog.logFilter
  const logOrder = clashLog.logOrder ?? 'asc'
  const isDescending = logOrder === 'desc'

  const [match, setMatch] = useState(() => (_: string) => true)
  const [searchState, setSearchState] = useState<SearchState>()
  const {
    response: { data: logData },
    refreshGetClashLog,
  } = useLogData()

  const filterLogs = useMemo(() => {
    if (!logData || logData.length === 0) {
      return []
    }

    // Server-side filtering handles level filtering via query parameters
    // We only need to apply search filtering here
    return logData.filter((data) => {
      // 构建完整的搜索文本，包含时间、类型和内容
      const searchText =
        `${data.time || ''} ${data.type} ${data.payload}`.toLowerCase()

      const matchesSearch = match(searchText)

      return (
        (logState == 'all' ? true : data.type.includes(logState)) &&
        matchesSearch
      )
    })
  }, [logData, logState, match])

  const filteredLogs = useMemo(
    () => (isDescending ? [...filterLogs].reverse() : filterLogs),
    [filterLogs, isDescending],
  )

  const handleLogLevelChange = (newLevel: string) => {
    setClashLog((pre: any) => ({ ...pre, logFilter: newLevel }))
  }

  const handleToggleLog = async () => {
    setClashLog((pre: any) => ({ ...pre, enable: !enableLog }))
  }

  const handleToggleOrder = () => {
    setClashLog((pre: any) => ({
      ...pre,
      logOrder: pre.logOrder === 'desc' ? 'asc' : 'desc',
    }))
  }
=======
import { useMemo, useState } from "react";
import { Box, Button, IconButton, MenuItem } from "@mui/material";
import { Virtuoso } from "react-virtuoso";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "foxact/use-local-storage";

import {
  PlayCircleOutlineRounded,
  PauseCircleOutlineRounded,
} from "@mui/icons-material";
import { useLogData, LogLevel, clearLogs } from "@/hooks/use-log-data";
import { useEnableLog } from "@/services/states";
import { BaseEmpty, BasePage } from "@/components/base";
import LogItem from "@/components/log/log-item";
import { useTheme } from "@mui/material/styles";
import { BaseSearchBox } from "@/components/base/base-search-box";
import { BaseStyledSelect } from "@/components/base/base-styled-select";
import { SearchState } from "@/components/base/base-search-box";

const LogPage = () => {
  const { t } = useTranslation();
  const [enableLog, setEnableLog] = useEnableLog();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [logLevel, setLogLevel] = useLocalStorage<LogLevel>(
    "log:log-level",
    "info",
  );
  const [match, setMatch] = useState(() => (_: string) => true);
  const logData = useLogData(logLevel);
  const [searchState, setSearchState] = useState<SearchState>();

  const filterLogs = useMemo(() => {
    return logData
      ? logData.filter((data) =>
          logLevel === "all"
            ? match(data.payload)
            : data.type.includes(logLevel) && match(data.payload),
        )
      : [];
  }, [logData, logLevel, match]);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <BasePage
      full
<<<<<<< HEAD
      title={t('logs.page.title')}
      contentStyle={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
      header={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            title={t(
              enableLog ? 'shared.actions.pause' : 'shared.actions.resume',
            )}
            aria-label={t(
              enableLog ? 'shared.actions.pause' : 'shared.actions.resume',
            )}
            size="small"
            color="inherit"
            onClick={handleToggleLog}
=======
      title={t("Logs")}
      contentStyle={{ height: "100%" }}
      header={
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            title={t("Pause")}
            size="small"
            color="inherit"
            onClick={() => setEnableLog((e) => !e)}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          >
            {enableLog ? (
              <PauseCircleOutlineRounded />
            ) : (
              <PlayCircleOutlineRounded />
            )}
          </IconButton>
<<<<<<< HEAD
          <IconButton
            title={t(
              isDescending
                ? 'logs.actions.showAscending'
                : 'logs.actions.showDescending',
            )}
            aria-label={t(
              isDescending
                ? 'logs.actions.showAscending'
                : 'logs.actions.showDescending',
            )}
            size="small"
            color="inherit"
            onClick={handleToggleOrder}
          >
            <SwapVertRounded
              sx={{
                transform: isDescending ? 'scaleY(-1)' : 'none',
                transition: 'transform 0.2s ease',
              }}
            />
          </IconButton>

          <Button
            size="small"
            variant="contained"
            onClick={() => {
              refreshGetClashLog(true)
            }}
          >
            {t('shared.actions.clear')}
          </Button>
=======

          {enableLog === true && (
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                clearLogs(logLevel);
              }}
            >
              {t("Clear")}
            </Button>
          )}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        </Box>
      }
    >
      <Box
        sx={{
          pt: 1,
          mb: 0.5,
<<<<<<< HEAD
          mx: '10px',
          height: '39px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <BaseStyledSelect
          value={logState}
          onChange={(e) => handleLogLevelChange(e.target.value as LogFilter)}
        >
          <MenuItem value="all">{t('shared.filters.logLevels.all')}</MenuItem>
          <MenuItem value="debug">
            {t('shared.filters.logLevels.debug')}
          </MenuItem>
          <MenuItem value="info">{t('shared.filters.logLevels.info')}</MenuItem>
          <MenuItem value="warn">{t('shared.filters.logLevels.warn')}</MenuItem>
          <MenuItem value="err">{t('shared.filters.logLevels.error')}</MenuItem>
        </BaseStyledSelect>
        <BaseSearchBox
          onSearch={(matcher, state) => {
            setMatch(() => matcher)
            setSearchState(state)
=======
          mx: "10px",
          height: "36px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <BaseStyledSelect
          value={logLevel}
          onChange={(e) => setLogLevel(e.target.value as LogLevel)}
        >
          <MenuItem value="all">ALL</MenuItem>
          <MenuItem value="info">INFO</MenuItem>
          <MenuItem value="warning">WARNING</MenuItem>
          <MenuItem value="error">ERROR</MenuItem>
          <MenuItem value="debug">DEBUG</MenuItem>
        </BaseStyledSelect>
        <BaseSearchBox
          onSearch={(matcher, state) => {
            setMatch(() => matcher);
            setSearchState(state);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          }}
        />
      </Box>

<<<<<<< HEAD
      {filteredLogs.length > 0 ? (
        <Virtuoso
          initialTopMostItemIndex={isDescending ? 0 : 999}
          data={filteredLogs}
          style={{
            flex: 1,
          }}
          itemContent={(index, item) => (
            <LogItem value={item} searchState={searchState} />
          )}
          followOutput={isDescending ? false : 'smooth'}
        />
      ) : (
        <BaseEmpty />
      )}
    </BasePage>
  )
}

export default LogPage
=======
      <Box
        height="calc(100% - 65px)"
        sx={{
          margin: "10px",
          borderRadius: "8px",
          bgcolor: isDark ? "#282a36" : "#ffffff",
        }}
      >
        {filterLogs.length > 0 ? (
          <Virtuoso
            initialTopMostItemIndex={999}
            data={filterLogs}
            itemContent={(index, item) => (
              <LogItem value={item} searchState={searchState} />
            )}
            followOutput={"smooth"}
          />
        ) : (
          <BaseEmpty />
        )}
      </Box>
    </BasePage>
  );
};

export default LogPage;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
