/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from 'react';
import { isEqual } from 'lodash-es';

/**
 * 1. 初始 基础分页逻辑，初始查询条件 -- 请求
 * 2. 分页 change 。保留查询条件。 分页逻辑 change -- 请求
 * 3. 查询条件 change。分页重置。查询调节 change -- 请求。如果查询条件与上次相同，则不改变分页

 *
 * 请求接口还是得由外面处理。因为入参返回字段不统一
 */
const DEFAULT_FILED_MAP = {
  // 入参
  current: 'pageNo', // 当前页
  pageSize: 'pageSize', // 每页条数

  // 返回
  data: 'list', // 数据
  total: 'total', // 总条数
};

const DEFAULT_CURRENT = 1;
const DEFAULT_PAGE_SIZE = 20;

interface QueryDataProps {
  pageCurrent?: number;
  pageSize?: number;
  [key: string]: any;
}

interface UseTableQueryProps {
  fieldMap?: any;
  request: (a?: any, b?: any) => Promise<QueryDataRes>;
  requestQuery?: any;
  isInitRequest?: boolean;
}

interface QueryDataRes {
  message?: string;
  messageCode?: number;
  success?: boolean;
  time?: string;
  data?: QueryDataProps;
  [key: string]: any;
}

const useTableQuery = (props: UseTableQueryProps) => {
  const {
    fieldMap = {}, // 外部引用时设置，会覆盖 DEFAULT_FILED_MAP 默认设置
    request = () => {}, // 请求方法
    requestQuery = {}, // 请求的其他参数
    isInitRequest = true, // 是否默认请求接口
  } = props || {};

  const requestFields = {
    ...DEFAULT_FILED_MAP,
    ...fieldMap,
  };

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [current, setCurrent] = useState(DEFAULT_CURRENT);
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({});

  // 请求数据接口
  const fetchData = async (queryData: QueryDataProps) => {
    setLoading(true);
    try {
      const res = await request({
        [requestFields.pageSize]: currentPageSize,
        [requestFields.current]: current,
        ...queryData,
        ...requestQuery,
      });
      setLoading(false);
      setDataSource(res?.data?.[requestFields.data] ?? []);
      setTotal(res?.data?.[requestFields.total] || 0);
    } catch {
      setLoading(false);
    }
  };

  // 切换 current，pageSize 并请求。
  const changeCurrentAndThenFetch = async ({
    pageCurrent,
    pageSize,
    newQuery,
  }: QueryDataProps) => {
    setCurrent(pageCurrent || DEFAULT_CURRENT);
    setCurrentPageSize(pageSize || DEFAULT_PAGE_SIZE);
    const nextQuery = newQuery || query;
    await fetchData({
      [requestFields.current]: pageCurrent,
      [requestFields.pageSize]: pageSize,
      ...nextQuery,
    });
  };

  const showTotalText = useMemo(() => {
    const start = (current - 1) * currentPageSize + 1;
    const ent =
      current * currentPageSize > total ? total : current * currentPageSize;
    return `当前第 ${start} 到 ${ent} 条，总共${total}条数据`;
  }, [current, currentPageSize, total]);
  // 分页配置
  const pagination = {
    current,
    pageSize: currentPageSize,
    total,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    showTotal: () => showTotalText,
    onChange: (pageCurrent: number, pageSize: number) => {
      changeCurrentAndThenFetch({ pageCurrent, pageSize });
    },
    onShowSizeChange: (pageCurrent: number, pageSize: number) => {
      changeCurrentAndThenFetch({ pageCurrent, pageSize });
    },
    showQuickJumper: true,
  };

  useEffect(() => {
    if (isInitRequest) {
      fetchData(query);
    }
  }, []);

  /**
   * 设置查询条件
   * @param {object | null} queryData
   */
  function handleSetQuery(queryData: QueryDataProps) {
    const newQuery = {
      ...queryData,
    };

    setQuery(newQuery);

    // 如果前后的 query 是相同的，那么直接查数据，否则设置页码为1
    if (isEqual(newQuery, query) || current === 1) {
      fetchData(newQuery);
    } else {
      changeCurrentAndThenFetch({
        pageCurrent: DEFAULT_CURRENT,
        pageSize: DEFAULT_PAGE_SIZE,
        newQuery,
      });
    }
  }
  /**
   * 刷新当前数据，包含query 和 pagination的
   * @param {object | null} queryData
   */
  function refreshData() {
    fetchData(query);
  }

  return {
    loading,
    setLoading,
    dataSource,
    pagination,
    query,
    setQuery: handleSetQuery,
    refreshData,
  };
};

export default useTableQuery;
