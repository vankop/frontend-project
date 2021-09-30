# View our quick start guide to get your API key and version ID:
# https://www.voiceflow.com/api/dialog-manager#section/Quick-Start
API_KEY='VF.6154b3fb732ec0001bca5332.kUyXxTfAgKKn4qCnI3R5KxnV1KYBeNQNrSmjyQP2vi'
VERSION_ID='61549e90b9731800060250ab'

USER_ID='111'
USER_INPUT='Hello world!'

#curl --request POST "https://general-runtime.voiceflow.com/state/$VERSION_ID/user/$USER_ID/interact" \
#     --header "Authorization: $API_KEY" \
#     --header 'Content-Type: application/json' \
#     --data-raw "{
#        \"request\": { \"type\": \"text\", \"payload\": \"$USER_INPUT\" }, \"config\": { \"tts\": true }
#     }"


curl -v 'https://general-runtime.voiceflow.com/state/61549e90b9731800060250ab/user/i11/interact' \
  -H 'Content-type: application/json;charset=UTF-8' \
  -H 'Authorization: VF.6154b3fb732ec0001bca5332.kUyXxTfAgKKn4qCnI3R5KxnV1KYBeNQNrSmjyQP2vi' \
  --data-raw '{"request":{"type":"launch"},"config":{"tts":true}}' \
  --compressed
