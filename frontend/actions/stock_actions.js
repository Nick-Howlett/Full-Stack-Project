import * as APIUtil from "../utils/stock_api_utils";
import {padChart, formatChart, createCharts, createProfileCharts, createProfile1dChart} from '../utils/chart_utils';


export const RECEIVE_CHART = "RECEIVE_CHART";
export const RECEIVE_INFO = "RECEIVE_INFO";
export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_TRANSACTIONS = "RECEIVE_TRANSACTIONS";
export const RECEIVE_PREV_CLOSES = "RECEIVE_PREV_CLOSES";
export const RECEIVE_PRICE = "RECEIVE_PRICE";
export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const RECEIVE_TRANSACTION_ERRORS = "RECEIVE_TRANSACTION_ERRORS";

export const fetchStock = symbol => dispatch => {
  APIUtil.fetchStock(symbol).then(info => dispatch(receiveInfo(symbol, info)));
};

export const getInfo = symbol => dispatch => {
  APIUtil.getInfo(symbol).then(info => dispatch(receiveInfo(symbol, info)));
};

export const getProfilePrevClose = (stockShares, id) => dispatch => {
  APIUtil.getProfilePrevClose(Object.keys(stockShares)).then(prevCloses => dispatch(receivePrevCloses(id, stockShares, prevCloses)));
}

export const makeTransaction = transaction => dispatch => {
  return APIUtil.makeTransaction(transaction).then(payload => dispatch(receiveTransaction(payload)), ({responseJSON}) => dispatch(receiveErrors(responseJSON)));
};

export const get1dChart = symbol => dispatch => {
  APIUtil.getChart(symbol, "1d").then(chart => dispatch(receiveChart({"1d": padChart(formatChart(chart, "1d"))})));
}

export const getCharts = symbol => dispatch => {
  APIUtil.getChart(symbol, "5y").then(chart => dispatch(receiveChart(createCharts(formatChart(chart, "5y")))));
};

export const getProfileCharts = stockShares => dispatch => {
  if(Object.entries(stockShares).length === 0 && stockShares.constructor === Object) return dispatch(receiveChart({"1w": [], "1m": [], "3m": [], "1y": [], "5y": []}));
  return APIUtil.getProfileChart(Object.keys(stockShares), "5y").then(charts => dispatch(receiveChart(createProfileCharts(stockShares, charts))));
}

export const getProfile1dChart = stockShares => dispatch => {
  if(Object.entries(stockShares).length === 0 && stockShares.constructor === Object) return dispatch(receiveChart({"1d": []}));
  return APIUtil.getProfileChart(Object.keys(stockShares), "1d").then(charts => dispatch(receiveChart({"1d": createProfile1dChart(stockShares, charts)})));
}

export const getNews = name => dispatch => {
  APIUtil.getNews(name).then(news => dispatch(receiveNews(news)));
};

export const getProfileNews = () => dispatch => {
  APIUtil.getProfileNews().then(news => dispatch(receiveNews(news)));
};

export const getPrice = symbol => dispatch => {
  APIUtil.getPrice(symbol).then(price => dispatch(receivePrice(symbol, price)));
}

export const getSearch = () => dispatch => {
  return APIUtil.getSearch().then(search => dispatch(receiveSearch(search)));
};


export const receivePrevCloses = (id, stockShares, prevCloses) => ({
  type: RECEIVE_PREV_CLOSES,
  id,
  stockShares,
  prevCloses
});

export const receiveErrors = errors => ({
  type: RECEIVE_TRANSACTION_ERRORS,
  errors
})


export const receivePrice = (symbol, price) => ({
  type: RECEIVE_PRICE,
  symbol,
  price
})

export const receiveTransaction = payload => ({
  type: RECEIVE_TRANSACTION,
  payload
});

export const receiveTransactions = transactions => ({
  type: RECEIVE_TRANSACTIONS,
  transactions
})


export const receiveInfo = (symbol, info) => ({
  type: RECEIVE_INFO,
  symbol,
  info
});

export const receiveNews = news => ({
  type: RECEIVE_NEWS,
  news
})


export const receiveChart = chart => ({
  type: RECEIVE_CHART,
  chart
});

export const receiveSearch = search => ({
  type: RECEIVE_SEARCH,
  search
})



