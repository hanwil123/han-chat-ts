import { Message } from "./Chat"


const Chatbuble = ({data} : {data: Array<Message>}) => {
  return (
    <>
    {data.map((message : Message, index : number) => {
        if (message.type === 'recv') {
          console.log("message received : ", message)
          console.log("message type : ", message.type)
            return (
            <div className="chat chat-start" key={index}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
      </div>
    </div>
    <div className="chat-header">
      {message.username}
      <time className="text-xs opacity-50">
        {new Date(message.timestamp).toLocaleTimeString()}
      </time>
    </div>
    <div className="chat-bubble">{message.content}</div>
    <div className="chat-footer opacity-50">
      { `Seen at ${new Date(message.timestamp).toLocaleTimeString()}`}
    </div>
  </div>
            )
        } else if (message.type === 'self') {
          return (
              <div className="chat chat-end" key={index}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
    </div>
  </div>
  <div className="chat-header">
    {message.username}
    <time className="text-xs opacity-50">
      {new Date(message.timestamp).toLocaleTimeString()}
    </time>
  </div>
  <div className="chat-bubble">{message.content}</div>
  <div className="chat-footer opacity-50">
    { `Seen at ${new Date(message.timestamp).toLocaleTimeString()}`}
  </div>
</div>
          )
        } {
        }
    })}
    </>
  )
}

export default Chatbuble
