let endpointCalls = 0;
let endpointTimes: number[] = [];
let shopifyCalls = 0;
let shopifyTimes: number[] = [];

export function recordEndpoint(ms: number) {
  endpointCalls++;
  endpointTimes.push(ms);
}

export function recordShopifyCall(ms: number) {
  shopifyCalls++;
  shopifyTimes.push(ms);
}

const avg = (arr: number[]) =>
  arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

export function getStats() {
  return {
    endpoint_response_times_ms: {
      average: avg(endpointTimes),
      max: Math.max(...endpointTimes, 0),
      min: Math.min(...endpointTimes, 0)
    },
    total_endpoint_calls: endpointCalls,
    average_shopify_call_responsetime_ms: avg(shopifyTimes),
    total_shopify_api_calls: shopifyCalls
  };
}
